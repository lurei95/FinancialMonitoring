﻿using System;
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
    public Guid FinancialItemId { get; set; }

    /// <summary>
    /// Id of the Category the item belongs to
    /// </summary>
    public Guid CategoryId { get; set; }

    /// <summary>
    /// The title of the item
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// The value of the item
    /// </summary>
    public decimal Value { get; set; }

    /// <summary>
    /// Date when the item was due
    /// </summary>
    public DateTime Date { get; set; }

    ///<inheritdoc/>
    public object Id => FinancialItemId;

    ///<inheritdoc/>
    public Guid UserId { get; set; }

    #region references

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