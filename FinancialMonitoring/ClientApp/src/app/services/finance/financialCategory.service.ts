import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { FinancialCategoryModel } from "src/app/models/finance/financialCatgegory.model";
import { ApiReply } from "src/app/models/utility/apiReply";
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

  retrieve(parameters: [{ name: string, value: Object }] = null): Observable<ApiReply<FinancialCategoryModel[]>> 
  {
    let result: FinancialCategoryModel[] = [];
    for(let i = 0; i < 50;i++)
    {
      let model = new FinancialCategoryModel();
      model.title = "Kategorie " + i;
      result.push(model);
    }

    let reply = new ApiReply<FinancialCategoryModel[]>(result, true, null)

    return of(reply);
  }
}