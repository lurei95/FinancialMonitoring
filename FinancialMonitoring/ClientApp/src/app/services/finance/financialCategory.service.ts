import { Injectable } from "@angular/core";
import { FinancialCategoryModel } from "src/app/models/finance/financialCatgegory.model";
import { ModelServiceBase } from "../modelServiceBase";
import { AuthenticationService } from "../security/authentication.service";
import { ApiService } from "../utility/api.service";

/**
 * Service for operations related to @see FinancialCategory
 */
@Injectable({
  providedIn: 'root'
})
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

  /**
   * Constructor
   * 
   * @param {ApiService} apiService Injected: The service for making api calls
   * @param {AuthenticationService} authenticationService Injected AuthenticationService
   */
  constructor(apiService: ApiService, authenticationService: AuthenticationService) 
  { super(apiService, authenticationService) }
}
}