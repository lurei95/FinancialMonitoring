using FinancialMonitoring.Entities.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace FinancialMonitoring.Entities.Finance
{
  /// <summary>
  /// A fiancial item
  /// </summary>
  public sealed class FinancialItem : IFinancialItem
  {
    /// <summary>
    /// Id of the item
    /// </summary>
    [JsonProperty("_financialItemId")]
    public Guid FinancialItemId { get; set; }

    /// <summary>
    /// Id of the Category the item belongs to
    /// </summary>
    [JsonProperty("_categoryId")]
    public Guid CategoryId { get; set; }

    /// <summary>
    /// The title of the item
    /// </summary>
    [JsonProperty("_title")]
    public string Title { get; set; }

    /// <summary>
    /// The value of the item
    /// </summary>
    [JsonProperty("_value")]
    public decimal Value { get; set; }

    /// <summary>
    /// Date when the item was due
    /// </summary>
    [JsonProperty("_dueDate")]
    public DateTime DueDate { get; set; }

    ///<inheritdoc/>
    public object Id => FinancialItemId;

    ///<inheritdoc/>
    [JsonProperty("_userId")]
    public Guid UserId { get; set; }

    #region references

    /// <summary>
    /// The user
    /// </summary>
    public User User { get; set; }

    /// <summary>
    /// Category the item belongs to
    /// </summary>
    public FinancialCategory Category { get; set; }

    /// <summary>
    /// Attachements of the item
    /// </summary>
    public List<AttachmentItem> Attachments { get; } = new List<AttachmentItem>();

    #endregion
  }
}