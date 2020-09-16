namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// Interface for a generic entity
  /// </summary>
  public interface IEntity
  {
    /// <summary>
    /// Id of the entity
    /// </summary>
    object Id { get; }
  }
}