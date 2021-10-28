namespace FinancialMonitoring.BusinessLogic.Infrastructure
{
  /// <summary>
  /// interface for the execution context of the business logic
  /// </summary>
  public interface IExecutionContext
  {
    /// <summary>
    /// ID of the user
    /// </summary>
    public int? UserId { get; }
  }
}
