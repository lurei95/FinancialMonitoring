import { FinancialCategoryModel } from "src/app/models/finance/financialCatgegory.model";
import { ModelServiceBase } from "../modelServiceBase";

/**
 * Service for operations related to @see FinancialCategory
 */
export class FinancialCategoryService extends ModelServiceBase<FinancialCategoryModel>
{
  /**
   * @inheritdoc
   */
  protected get path(): string { return "FinanceItems"; }

  /**
   * @inheritdoc
   */
  protected get type(): new () => FinancialCategoryModel { return FinancialCategoryModel; }
}