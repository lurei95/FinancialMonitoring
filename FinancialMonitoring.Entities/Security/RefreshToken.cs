using Newtonsoft.Json;
using System;

namespace FinancialMonitoring.Entities.Security
{
  /// <summary>
  /// Refresh token for a user
  /// </summary>
  public sealed class RefreshToken : IUserSpecificEntity
  {
    ///<inheritdoc/>
    public object Id => TokenId;

    /// <summary>
    /// Id of the token
    /// </summary>
    [JsonProperty("_tokenId")]
    public long TokenId { get; set; }

    /// <summary>
    /// The id of the user
    /// </summary>
    [JsonProperty("_userId")]
    public Guid UserId { get; set; }

    /// <summary>
    /// The token
    /// </summary>
    [JsonProperty("_token")]
    public string Token { get; set; }

    /// <summary>
    /// Expiration date for the token
    /// </summary>
    [JsonProperty("_expirationDate")]
    public DateTime ExpirationDate { get; set; }

    /// <summary>
    /// The user
    /// </summary>
    public User User { get; set; }

    ///<inheritdoc/>
    public string GetDisplayName() => null;
  }
}
