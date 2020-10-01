/**
 * The occurence kind for a finacial item
 */
export enum OccurenceKind
{
  /**
   * The FinancialItem occures only one time 
   */
  OneTime = "OneTime",
  /**
   * The FinancialItem occures every month
   */
  Monthly = "Monthly",
  /**
   * The FinancialItem occures every year
   */
  Yearly = "Yearly"
}