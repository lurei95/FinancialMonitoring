using FinancialMonitoring.BusinessLogic.UserManagement;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// class for generating JWT
  /// </summary>
  public sealed class TokenGenerator
  {
    private readonly JwtOptions jwtOptions;
    private readonly ClaimsFactory claimsFactory;

    /// <summary>
    /// Creates an instance of <see cref="TokenGenerator"/>
    /// </summary>
    /// <param name="jwtOptions">options for the jwt generation</param>
    /// <param name="claimsFactory">claims factory</param>
    public TokenGenerator(IOptions<JwtOptions> jwtOptions, ClaimsFactory claimsFactory)
    {
      this.jwtOptions = jwtOptions?.Value ?? throw new ArgumentNullException(nameof(jwtOptions));
      this.claimsFactory = claimsFactory ?? throw new ArgumentNullException(nameof(claimsFactory));
    }

    /// <summary>
    /// Generates a JWT for the user
    /// </summary>
    /// <param name="user">the user</param>
    /// <returns>JWT for the user</returns>
    public async Task<JwtSecurityToken> GenerateToken(UserIdentityData user)
    {
      if (user == null)
        throw new ArgumentNullException(nameof(user));
      var expires = DateTime.UtcNow.AddMinutes(60);
      return await this.GenerateTokenCore(user, expires);
    }

    private static void AddDefaultJwtClaims(UserIdentityData user, IList<Claim> claims)
    {
      claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Email));
      claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
      claims.Add(new Claim(
        JwtRegisteredClaimNames.Iat, 
        DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(CultureInfo.InvariantCulture), 
        ClaimValueTypes.Integer64));
    }

    private async Task<JwtSecurityToken> GenerateTokenCore(UserIdentityData user, DateTime expires)
    {
      var claims = await this.claimsFactory.GetIdentityClaims(user);
      AddDefaultJwtClaims(user, claims);
      return this.CreateJwt(claims, expires);
    }

    private JwtSecurityToken CreateJwt(IList<Claim> claims, DateTime? expires)
    {
      return new JwtSecurityToken(
        issuer: this.jwtOptions.Issuer,
        audience: this.jwtOptions.Audience,
        claims: claims,
        notBefore: DateTime.UtcNow,
        expires: expires,
        signingCredentials: this.jwtOptions.SigningCredentials);
    }
  }
}
