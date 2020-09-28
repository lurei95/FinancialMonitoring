import { Injectable } from '@angular/core';
import { FinancialItemModel } from '../../models/finance/financialItem.model';
import { ModelServiceBase } from "../modelServiceBase";
import { AuthenticationService } from '../security/authentication.service';
import { ApiService } from '../utility/api.service';

/**
 * Service for operations related to @see FinancialItemModel
 */
@Injectable({
  providedIn: 'root'
})
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

  /**
   * Constructor
   * 
   * @param {ApiService} apiService Injected: The service for making api calls
   * @param {AuthenticationService} authenticationService Injected AuthenticationService
   */
  constructor(apiService: ApiService, authenticationService: AuthenticationService) 
  { super(apiService, authenticationService) }
}