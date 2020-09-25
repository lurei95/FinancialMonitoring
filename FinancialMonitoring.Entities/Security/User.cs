using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace FinancialMonitoring.Entities.Security
{
  /// <summary>
  /// A user of the app
  /// </summary>
  public sealed class User : IEntity
  {
    /// <summary>
    /// The test user
    /// </summary>
    public static User GuestUser { get; } = new User()
    {
      UserId = Guid.Parse("58C07E7D-6427-43E2-B318-EBAA9294F8A8"),
      Email = "test@test.com",
      Password = "test"
    };

    ///<inheritdoc/>
    public object Id => UserId;

    ///<inheritdoc/>
    public string Route => "Users";

    /// <summary>
    /// UserId
    /// </summary>
    [JsonProperty("_userId")]
    public Guid UserId { get; set; }

    /// <summary>
    /// Email of the user
    /// </summary>
    [JsonProperty("_email")]
    public string Email { get; set; }

    /// <summary>
    /// Password
    /// </summary>
    [JsonProperty("_password")]
    public string Password { get; set; }

    /// <summary>
    /// The access token
    /// </summary>
    [JsonProperty("_accessToken")]
    public string AccessToken { get; set; }

    /// <summary>
    /// The refresh token
    /// </summary>
    [JsonProperty("_refreshToken")]
    public string RefreshToken { get; set; }

    /// <summary>
    /// Refresh tokens
    /// </summary>
    public List<RefreshToken> RefreshTokens { get; } = new List<RefreshToken>();
  }
}
