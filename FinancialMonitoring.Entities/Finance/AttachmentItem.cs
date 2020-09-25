﻿using FinancialMonitoring.Entities.Security;
using System;

namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// An attachement to a financial item or category
  /// </summary>
  public sealed class AttachmentItem : IEntity, IUserSpecificEntity
  {
    /// <summary>
    /// Id of the attachement
    /// </summary>
    public long AttachmentItemId { get; set; }

    /// <summary>
    /// Id of the parent financial Item
    /// </summary>
    public Guid? FinancialItemId { get; set; }

    /// <summary>
    /// Id of the parent financial category
    /// </summary>
    public Guid? FinancialCategoryId { get; set; }

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

    ///<inheritdoc/>
    public object Id => AttachmentItemId;

    ///<inheritdoc/>
    public Guid UserId { get; set; }

    #region references
    
    /// <summary>
    /// The user
    /// </summary>
    public User User { get; set; }

    #endregion
  }
}