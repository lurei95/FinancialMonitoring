﻿using FinancialMonitoring.Entities.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SpacedRepetitionSystem.WebAPI.Core;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using FinancialMonitoring.Utility;
using System.Threading.Tasks;

namespace FinancialMonitoring.Controllers.Security
{
  /// <summary>
  /// Controller for <see cref="User"/>
  /// </summary>
  [Route("api/[controller]")]
  [ApiController]
  public sealed class UsersController : EntityControllerBase<User, Guid>
  {
    private readonly JWTSettings jwtSettings;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="context">DBContext (injected)</param>
    /// <param name="jwtSettings">The jwt settings</param>
    public UsersController(DbContext context, IOptions<JWTSettings> jwtSettings) : base(context)
    { this.jwtSettings = jwtSettings.Value; }

    ///<inheritdoc/>
    [Authorize]
    [HttpGet("{id}")]
    public override async Task<ActionResult<User>> GetAsync([FromRoute] Guid id)
    {
      User user = await Context.Set<User>().FindAsync(id);
      if (user == null)
        return NotFound();
      return user;
    }

    ///<inheritdoc/>
    [HttpGet]
    public override Task<ActionResult<List<User>>> GetAsync(IDictionary<string, object> searchParameters)
    { throw new NotSupportedException(); }

    /// <summary>
    /// Returns user or null if no user exists
    /// </summary>
    /// <param name="user">The user</param>
    /// <returns>User or null</returns>
    [HttpPost("Login")]
    public async Task<ActionResult<User>> Login([FromBody] User user)
    {
      if (user == null)
        return BadRequest();

      string password = user.Password.Encrypt();
      User user1 = await Context.Set<User>()
        .Where(user2 => user2.Email == user.Email && user2.Password == password)
        .FirstOrDefaultAsync();

      if (user1 == null)
        return NotFound();

      RefreshToken refreshToken = GenerateRefreshToken();
      user1.RefreshTokens.Add(refreshToken);
      user1.AccessToken = GenerateAccessToken(user1.UserId);
      user1.RefreshToken = refreshToken.Token;
      await Context.SaveChangesAsync();
      return user1;
    }

    /// <summary>
    /// Returns user or null if no user exists
    /// </summary>
    /// <param name="user">The user</param>
    /// <returns>User or null</returns>
    [HttpPost("Signup")]
    public async Task<ActionResult<User>> Signup([FromBody] User user)
    {
      if (user == null)
        return BadRequest();

      Context.Add(user);
      user.UserId = Guid.NewGuid();
      user.Password = user.Password.Encrypt();
      RefreshToken refreshToken = GenerateRefreshToken();
      user.RefreshTokens.Add(refreshToken);
      user.RefreshToken = refreshToken.Token;
      CreateInitialDataForNewUser(user);
      user.UserId = Guid.NewGuid();
      user.AccessToken = GenerateAccessToken(user.UserId);
      await Context.SaveChangesAsync();

      return user;
    }

    /// <summary>
    /// Refreshes the jwt token for a user
    /// </summary>
    /// <param name="refreshRequest">Request containing the old jwt token and the refresh token</param>
    /// <returns></returns>
    [HttpPost("RefreshToken")]
    public async Task<ActionResult<User>> RefreshToken([FromBody] RefreshRequest refreshRequest)
    {
      if (refreshRequest == null)
        return BadRequest();
      User user = await GetUserFromAccessToken(refreshRequest.AccessToken);
      if (user == null)
        return NotFound();

      if (ValidateRefreshToken(user, refreshRequest.RefreshToken))
      {
        user.AccessToken = GenerateAccessToken(user.UserId);
        return user;
      }
      else
        return Unauthorized();
    }

    /// <summary>
    /// Gets a user by its accesss token
    /// </summary>
    /// <param name="accessToken">The access token</param>
    /// <returns></returns>
    [HttpPost("GetUserByAccessToken")]
    public async Task<ActionResult<User>> GetUserByAccessToken([FromBody] string accessToken)
    {
      if (string.IsNullOrEmpty(accessToken))
        return BadRequest();
      User user = await GetUserFromAccessToken(accessToken);
      if (user == null)
        return NotFound();
      return user;
    }

    ///<inheritdoc/>
    protected override Task<ActionResult<User>> PostCoreAsync(User entity)
    { throw new NotSupportedException(); }

    ///<inheritdoc/>
    protected override Task<IActionResult> DeleteCoreAsync(Guid id)
    { throw new NotSupportedException(); }

    ///<inheritdoc/>
    protected override Task<ActionResult<User>> PutCoreAsync(User entity)
    { throw new NotSupportedException(); }

    private bool ValidateRefreshToken(User user, string refreshToken)
    {
      RefreshToken refreshTokenUser = Context.Set<RefreshToken>()
        .Where(rt => rt.Token == refreshToken)
        .OrderByDescending(rt => rt.ExpirationDate)
        .FirstOrDefault();

      if (refreshTokenUser != null && refreshTokenUser.UserId == user.UserId
        && refreshTokenUser.ExpirationDate > DateTime.UtcNow)
        return true;
      return false;
    }

    private async Task<User> GetUserFromAccessToken(string accessToken)
    {
      try
      {
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);

        TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateLifetime = false,
          ValidateAudience = false
        };

        ClaimsPrincipal principle = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out SecurityToken securityToken);
        if (securityToken is JwtSecurityToken jwtSecurityToken
          && jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
          string userId = principle.FindFirst(ClaimTypes.Name)?.Value;
          return await Context.Set<User>()
            .Where(user => user.UserId == Guid.Parse(userId))
            .FirstOrDefaultAsync();
        }
      }
      catch (Exception)
      {
        return new User();
      }
      return new User();
    }

    private RefreshToken GenerateRefreshToken()
    {
      RefreshToken refreshToken = new RefreshToken();

      byte[] randomNumber = new byte[32];
      using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(randomNumber);
        refreshToken.Token = Convert.ToBase64String(randomNumber);
      }
      refreshToken.ExpirationDate = DateTime.UtcNow.AddMonths(6);

      return refreshToken;
    }

    private string GenerateAccessToken(Guid userId)
    {
      JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
      byte[] key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);
      SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, Convert.ToString(userId)) }),
        Expires = DateTime.UtcNow.AddDays(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
          SecurityAlgorithms.HmacSha256Signature)
      };
      SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    private void CreateInitialDataForNewUser(User user)
    {
    }
  }
}
