using System;
using System.Collections.Generic;
using System.Linq;

namespace FinancialMonitoring.Entities
{
  public sealed class FinancialCategory : IFinancialItem
  {
    public Guid FinancialCategoryId { get; set; }

    public string Name { get; set; }

    public List<IFinancialItem> ChildItems { get; } = new List<IFinancialItem>();

    public decimal Value => ChildItems.Sum(child => child.Value);
  }
}