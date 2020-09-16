using System;

namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// An attachement to financial item or category
  /// </summary>
  public sealed class AttachmentItem
  {
    /// <summary>
    /// Id of the attachement
    /// </summary>
    public long AttachmentItemId { get; set; }

    /// <summary>
    /// Id of the parent entity
    /// </summary>
    public Guid ParentId { get; set; }

    /// <summary>
    /// Title of the attachement
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// The attachment
    /// </summary>
    public string Attachement { get; set; }

    /// <summary>
    /// Date when the attachement was added
    /// </summary>
    public DateTime AddedDate { get; set; }
  }
}