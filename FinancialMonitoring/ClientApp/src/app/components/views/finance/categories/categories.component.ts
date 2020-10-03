import { NotificationService } from './../../../../services/utility/notification.service';
import { map, tap } from 'rxjs/operators';
import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { FinancialCategoryModel } from './../../../../models/finance/financialCatgegory.model';
import { Observable } from 'rxjs';
import { Component} from '@angular/core';
import { ApiReply } from 'src/app/models/utility/apiReply';

/**
 * Components for displaying a list of categories
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent
{
  private columns: string[] = ["title", "value", "items", "edit", "add-item", "delete"];

  private searchFunction: (param: string) => Observable<FinancialCategoryModel[]>;

  /**
   * Constructor
   * 
   * @param {FinancialCategoryService} service Injected: FinancialCategoryService
   */
  constructor(service: FinancialCategoryService, notificationService: NotificationService)
  {
    this.searchFunction = (param: string) => 
    {
      let result: Observable<ApiReply<FinancialCategoryModel[]>>;
      if (param)
        result = service.retrieve([{name: "searchText", value: param}]);
      else
        result = service.retrieve();
      return result.pipe(tap(reply => 
      {
        if (!reply.successful)
          notificationService.notifyErrorMessage(reply.message);
      }), map(reply => reply.result));
    }
  }
}