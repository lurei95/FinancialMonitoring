import { FinancialItemModel } from '../../models/finance/financialItem.model';
import { ModelServiceBase } from "../modelServiceBase";

/**
 * Service for operations related to @see FinancialItemModel
 */
export class FinancialItemService extends ModelServiceBase<FinancialItemModel>
{
  /**
   * @inheritdoc
   */
  protected get path(): string { return "FinanceItems"; }

  /**
   * @inheritdoc
   */
  protected get type(): new () => FinancialItemModel { return FinancialItemModel; }
}