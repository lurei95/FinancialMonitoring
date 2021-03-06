﻿using FinancialMonitoring.Entities.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinancialMonitoring.Entities.Finance
{
  /// <summary>
  /// A catgory in which multiple financial items can be organized
  /// </summary>
  public sealed class FinancialCategory : IFinancialItem
  {
    /// <summary>
    /// Id of the category
    /// </summary>
    [JsonProperty("_financialCategoryId")]
    public long FinancialCategoryId { get; set; }

    /// <summary>
    /// The title of the category
    /// </summary>
    [JsonProperty("_title")]
    public string Title { get; set; }

    /// <summary>
    /// Id of the parent category
    /// </summary>
    [JsonProperty("_parentId")]
    public long? ParentId { get; set; }

    ///<inheritdoc/>
    public object Id => FinancialCategoryId;

    /// <summary>
    /// Total value of the category
    /// </summary>
    public decimal Value => Items.Sum(item => item.Value) + ChildCategories.Sum(child => child.Value);

    ///<inheritdoc/>
    public Guid UserId { get; set; }

    #region references

    /// <summary>
    /// The user
    /// </summary>
    public User User { get; set; }

    /// <summary>
    /// The parent category
    /// </summary>
    public FinancialCategory Parent { get; set; }

    /// <summary>
    /// The child categories
    /// </summary>
    public List<FinancialCategory> ChildCategories { get; } = new List<FinancialCategory>();

    /// <summary>
    /// The items
    /// </summary>
    public List<FinancialItem> Items { get; } = new List<FinancialItem>();

    /// <summary>
    /// The attachements
    /// </summary>
    public List<AttachmentItem> Attachments { get; } = new List<AttachmentItem>();

    #endregion
  }
}