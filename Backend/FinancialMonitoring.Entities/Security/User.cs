using System.Collections.Generic;

namespace FinancialMonitoring.Entities.Security
{
  /// <summary>
  /// A user of the app
  /// </summary>
  public sealed class User
  {
    /// <summary>
    /// UserId
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Email of the user
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Password salt
    /// </summary>
    public string PasswordSalt { get; set; }

    /// <summary>
    /// Password hash
    /// </summary>
    public string PasswordHash { get; set; }

    /// <summary>
    /// The access token
    /// </summary>
    public string AccessToken { get; set; }

    /// <summary>
    /// The refresh token
    /// </summary>
    public string RefreshToken { get; set; }

    /// <summary>
    /// Refresh tokens
    /// </summary>
    public List<RefreshToken> RefreshTokens { get; } = new List<RefreshToken>();
  }
}
