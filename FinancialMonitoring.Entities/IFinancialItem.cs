namespace FinancialMonitoring.Entities
{
  /// <summary>
  /// Inteface for a financial item
  /// </summary>
  public interface IFinancialItem
  {
    /// <summary>
    /// Title of the item
    /// </summary>
    string Title { get; set; }

    /// <summary>
    /// Value of the item
    /// </summary>
    decimal Value { get; }
  }
}