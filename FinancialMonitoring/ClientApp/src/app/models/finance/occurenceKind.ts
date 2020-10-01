/**
 * The occurence kind for a finacial item
 */
export enum OccurenceKind
{
  /**
   * The FinancialItem occures only one time 
   */
  OneTime,
  /**
   * The FinancialItem occures every month
   */
  Monthly,
  /**
   * The FinancialItem occures every year
   */
  Yearly
}