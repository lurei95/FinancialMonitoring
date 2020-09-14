using System;
using System.Collections.Generic;

namespace FinancialMonitoring.Entities
{
  public sealed class FinancialItem : IFinancialItem
  {
    public Guid FinancialItemId { get; set; }

    public Guid CategoryId { get; set; }

    public string Title { get; set; }

    public decimal Value { get; set; }

    public DateTime Date { get; set; }

    #region references

    public FinancialCategory Category { get; set; }

    public List<AttachmentItem> Attachments { get; } = new List<AttachmentItem>();

    #endregion
  }
}