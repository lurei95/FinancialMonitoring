using System;

namespace FinancialMonitoring.Entities
{
  public sealed class AttachmentItem
  {
    public long AttachmentItemId { get; set; }

    public Guid ParentId { get; set; }

    public string Title { get; set; }

    public string Attachement { get; set; }

    public DateTime AddedDate { get; set; }
  }
}