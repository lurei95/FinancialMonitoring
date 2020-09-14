using System;
using System.Collections.Generic;
using System.Linq;

namespace FinancialMonitoring.Entities
{
  public sealed class FinancialCategory : IFinancialItem
  {
    public Guid FinancialCategoryId { get; set; }

    public string Title { get; set; }

    public Guid? ParentId { get; set; }

    public decimal Value => Items.Sum(item => item.Value) + ChildCategories.Sum(child => child.Value);

    #region references

    public FinancialCategory Parent { get; set; }

    public List<FinancialCategory> ChildCategories { get; } = new List<FinancialCategory>();

    public List<FinancialItem> Items { get; } = new List<FinancialItem>();

    public List<AttachmentItem> Attachments { get; } = new List<AttachmentItem>();

    #endregion
  }
}