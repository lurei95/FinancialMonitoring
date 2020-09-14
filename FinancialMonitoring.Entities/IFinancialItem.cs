namespace FinancialMonitoring.Entities
{
  public interface IFinancialItem
  {
    string Name { get; set; }

    decimal Value { get; }
  }
}