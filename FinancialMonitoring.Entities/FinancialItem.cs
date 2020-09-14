using System;

namespace FinancialMonitoring.Entities
{
  public sealed class FinancialItem : IFinancialItem
  {
    public Guid FinancialItemId { get; set; }

    public Guid ParanetId { get; set; }

    public FinancialCategory Parent { get; set; }

    public string Name { get; set; }

    public decimal Value { get; set; }

    public DateTime Date { get; set; }
  }
}