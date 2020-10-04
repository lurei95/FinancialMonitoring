import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { Router } from '@angular/router';
import { SearchGridComponent } from './../../../data/search-grid/search-grid.component';
import { FinancialCategoryModel } from 'src/app/models/finance/financialCatgegory.model';
import { NotificationService } from './../../../../services/utility/notification.service';
import { map, tap  } from 'rxjs/operators';
import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { Observable } from 'rxjs';
import { Component, ViewChild} from '@angular/core';
import { ApiReply } from 'src/app/models/utility/apiReply';
import { MatDialog } from '@angular/material';
import { FinancialItemEditDialogComponent } from '../financial-item-edit-dialog/financial-item-edit-dialog.component';

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
  private columns: string[] = ["new", "title", "value", "items", "edit", "add-item", "delete"];

  private searchFunction: (param: string) => Observable<FinancialCategoryModel[]>;

  @ViewChild(SearchGridComponent, {static: false}) private grid: SearchGridComponent;

  /**
   * Constructor
   * 
   * @param {FinancialCategoryService} service Injected: FinancialCategoryService
   * @param {FinancialCategoryService} service Injected: NotificationService
   */
  constructor(private service: FinancialCategoryService, 
    private router: Router, private dialog: MatDialog,
    private notificationService: NotificationService)
  {
    this.searchFunction = (param: string) => 
    {
      let result$: Observable<ApiReply<FinancialCategoryModel[]>>;
      if (param)
        result$ = service.retrieve([{name: "searchText", value: param}]);
      else
        result$ = service.retrieve();
      return result$.pipe(tap(reply => this.handleApiReply(reply)), map(reply => reply.result));
    }
  }

  private delete(model: FinancialCategoryModel)
  { 
    this.grid.removeItem(model);
    this.service.delete(model.financialCategoryId).pipe(tap(reply => this.handleApiReply(reply))); 
  }

  private edit(model: FinancialCategoryModel)
  { 
    this.router.navigateByUrl(
      this.router.url + "/" + model.financialCategoryId);
  }

  private new()
  { this.router.navigateByUrl(this.router.url + "/new"); }

  private addItem(model: FinancialCategoryModel)
  { 
    let item: FinancialItemModel = new FinancialItemModel();
    item.categoryId = model.financialCategoryId;
    this.dialog.open(FinancialItemEditDialogComponent, {
      panelClass: 'fullscreenDialog',
      data: item,
      disableClose: true
    });
  }

  private handleApiReply(reply: ApiReply<any>)
  {
    if (!reply.successful)
      this.notificationService.notifyErrorMessage(reply.message);
  }
}