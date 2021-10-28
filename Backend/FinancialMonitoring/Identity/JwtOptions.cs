using Microsoft.IdentityModel.Tokens;
using System;

namespace FinancialMonitoring.Identity
{
  /// <summary>
  /// options for the JWT
  /// </summary>
  public class JwtOptions
  {
    /// <summary>
    /// issuer ofthe token 
    /// </summary>
    public string Issuer { get; set; }

    /// <summary>
    /// audience of the token
    /// </summary>
    public string Audience { get; set; }

    /// <summary>
    /// validity duration of the login token
    /// </summary>
    public TimeSpan LoginTokenValidityDuration { get; set; } = TimeSpan.FromSeconds(10);

    /// <summary>
    /// key fopr signing the tokens
    /// </summary>
    public SigningCredentials SigningCredentials { get; set; }
  }
}
