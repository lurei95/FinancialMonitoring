namespace FinancialMonitoring.Entities.Finance
{
  /// <summary>
  /// The occurence kind for a finacial item
  /// </summary>
  public enum OccurenceKind
  {
    /// <summary>
    /// The FinancialItem occures only one time 
    /// </summary>
    OneTime,
    /// <summary>
    /// The FinancialItem occures every month
    /// </summary>
    Monthly,
    /// <summary>
    /// The FinancialItem occures every year
    /// </summary>
    Yearly
  }
}