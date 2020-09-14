using System;

namespace FinancialMonitoring.Entities
{
  public sealed class ReferenceItem
  {
    public long ReferenceItemId { get; set; }

    public Guid ParentId { get; set; }

    public IFinancialItem Parent { get; set; }

    public ParentKind ParentKind { get; set; }

    public string Title { get; set; }

    public string Reference { get; set; }

    public DateTime AddedDate { get; set; }
  }
}

public enum ParentKind
{
  FinancialItem,

  FinancialCategory
}