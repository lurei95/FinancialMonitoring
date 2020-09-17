using System;

namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// Interface for a user specific entity
  /// </summary>
  public interface IUserSpecificEntity : IEntity
  {
    /// <summary>
    /// Id of the user
    /// </summary>
    Guid UserId { get; set; }
  }
}