using Newtonsoft.Json;

namespace FinancialMonitoring.Entities.Security
{
  /// <summary>
  /// Request for refreshing the jwt of a user
  /// </summary>
  public sealed class RefreshRequest
  {
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
  }
}
