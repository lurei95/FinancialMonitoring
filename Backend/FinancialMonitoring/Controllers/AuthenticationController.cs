using AutoMapper;
using FinancialMonitoring.BusinessLogic.UserManagement;
using FinancialMonitoring.DataTransferObjects.Identity;
using FinancialMonitoring.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace FinancialMonitoring.Controllers
{
  /// <summary>
  /// Controller for authentication
  /// </summary>
  [Route("[controller]")]
  [ApiController]
  public sealed class AuthenticationController : ControllerBase
  {
    private readonly SignInManager<UserIdentityData> signInManager;
    private readonly UserIdentityLogic userIdentityLogic;
    private readonly TokenGenerator tokenGenerator;
    private readonly IMapper mapper;

    /// <summary>
    /// Creates an instance of <see cref="AuthenticationController"/>
    /// </summary>
    /// <param name="signInManager">sign in manager</param>
    /// <param name="userIdentityLogic">logic for user identity</param><
    /// <param name="tokenGenerator">class for generating JWTs</param>
    public AuthenticationController(
      SignInManager<UserIdentityData> signInManager, 
      UserIdentityLogic userIdentityLogic, 
      TokenGenerator tokenGenerator,
      IMapper mapper)
    {
      this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
      this.userIdentityLogic = userIdentityLogic ?? throw new ArgumentNullException(nameof(userIdentityLogic));
      this.tokenGenerator = tokenGenerator ?? throw new ArgumentNullException(nameof(tokenGenerator));
      this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
    }

    /// <summary>
    /// tries to log in the user
    /// </summary>
    /// <param name="credentials">login credentials</param>
    /// <param name="cancellationToken">cancellation token</param>
    /// <returns>result of the login attempt</returns>
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthenticationResultDto>> Login(
      [FromBody] CredentialsDto credentials, CancellationToken cancellationToken)
    {
      if (credentials == null)
        return this.BadRequest();

      var result = await this.GetAuthenticationResult(credentials, cancellationToken);

      if (result == null)
      {
        return this.UnprocessableEntity(new ProblemDetails()
        {
          Status = (int)HttpStatusCode.UnprocessableEntity,
          Title = "wrong credentials"
        });
      }

      return result;
    }

    private async Task<AuthenticationResultDto> GetAuthenticationResult(
      CredentialsDto credentials, CancellationToken cancellationToken)
    {
      if (credentials == null ||
        string.IsNullOrEmpty(credentials.Email) ||
        string.IsNullOrEmpty(credentials.Password))
      {
        return null;
      }

      var userIdentity = await this.userIdentityLogic.GetUserByEmail(
        credentials.Email, cancellationToken);

      if (userIdentity == null || userIdentity.UserId == 0)
        return null;

      var result = await this.signInManager.CheckPasswordSignInAsync(
        userIdentity, credentials.Password, true);

      if (!result.Succeeded)
        return null;

      return await this.GetAuthenticationResult(userIdentity);
    }

    private async Task<AuthenticationResultDto> GetAuthenticationResult(UserIdentityData userIdentity)
    {
      if (!(await this.signInManager.CanSignInAsync(userIdentity)))
        return null;

      var jwtToken = await this.tokenGenerator.GenerateToken(userIdentity);
      var (token, expires, issuedAt) = (
        new JwtSecurityTokenHandler().WriteToken(jwtToken), 
        jwtToken.ValidTo, 
        jwtToken.IssuedAt
      );

      return new AuthenticationResultDto()
      {
        User = this.mapper.Map<UserIdentityInfoDto>(userIdentity),
        Token = token,
        TokenExpirationDate = expires,
        TokenIssuedAtDate = issuedAt,
      };
    }
  }
}
