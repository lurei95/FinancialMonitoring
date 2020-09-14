namespace FinancialMonitoring.Entities
{
  public interface IFinancialItem
  {
    string Title { get; set; }

    decimal Value { get; }
  }
}