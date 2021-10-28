using System;

namespace FinancialMonitoring.DataTransferObjects.Identity
{
  /// <summary>
  /// DTO for the authentication result
  /// </summary>
  public sealed class AuthenticationResultDto
  {
    /// <summary>
    /// Info about the user
    /// </summary>
    public UserIdentityInfoDto User { get; set; }

    /// <summary>
    /// Authentication token
    /// </summary>
    public string Token { get; set; }

    /// <summary>
    /// Date when the token expires
    /// </summary>
    public DateTimeOffset TokenExpirationDate { get; set; }

    /// <summary>
    /// Date when the token was issued
    /// </summary>
    public DateTimeOffset TokenIssuedAtDate { get; set; }
  }
}
