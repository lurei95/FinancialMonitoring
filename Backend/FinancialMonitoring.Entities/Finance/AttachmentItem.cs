using FinancialMonitoring.Entities.Security;
using Newtonsoft.Json;
using System;

namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// An attachement to a financial item or category
  /// </summary>
  public sealed class AttachmentItem : IEntity, IUserSpecificEntity
  {
    /// <summary>
    /// Id of the attachement
    /// </summary>
    [JsonProperty("_attachmentId")]
    public long AttachmentItemId { get; set; }

    /// <summary>
    /// Id of the parent financial Item
    /// </summary>
    [JsonProperty("_financialItemId")]
    public long? FinancialItemId { get; set; }

    /// <summary>
    /// Id of the parent financial category
    /// </summary>
    [JsonProperty("_financialCategoryId")]
    public long? FinancialCategoryId { get; set; }

    /// <summary>
    /// Title of the attachement
    /// </summary>
    [JsonProperty("_title")]
    public string Title { get; set; }

    /// <summary>
    /// The attachment
    /// </summary>
    [JsonProperty("_attachment")]
    public string Attachment { get; set; }

    /// <summary>
    /// Date when the attachement was added
    /// </summary>
    [JsonProperty("_addedDate")]
    public DateTime AddedDate { get; set; }

    ///<inheritdoc/>
    public object Id => AttachmentItemId;

    ///<inheritdoc/>
    [JsonProperty("_userId")]
    public Guid UserId { get; set; }

    #region references
    
    /// <summary>
    /// The user
    /// </summary>
    public User User { get; set; }

    #endregion
  }
}