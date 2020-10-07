import { FinancialCategoryModel } from 'src/app/models/finance/financialCatgegory.model';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatTableDataSource } from '@angular/material';
import { map, switchMap, tap } from 'rxjs/operators';

/**
 * Component for a edit page for a @see FinancialCategoryModel
 */
@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit 
{
  private get title(): string  
  { return this.localizationService.execute("FinancialCategory_Title", { title: this.entity.title }); }

  private columns: string[] = ["new", "title", "direction", "value", "due", "edit", "delete"];

  private dataSource: MatTableDataSource<FinancialItemModel> = new MatTableDataSource();

  private _entity: FinancialCategoryModel;
  /**
   * @param {FinancialCategoryModel} value The category which is bein edited
   */
  set entity(value: FinancialCategoryModel)
  { 
    this._entity = value;
    this.dataSource.data = value.items; 
  }
  /**
   * @returns {FinancialCategoryModel} The category which is bein edited
   */
  get entity(): FinancialCategoryModel{ return this._entity;  }

  /**
   * Constructor
   * 
   * @param {ActivatedRoute} route The rout used to navigate to the page
   * @param {FinancialCategoryService} service Injected: FinancialCategoryService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {LocalizationService} localizationService Injected: LocalizationService
   */
  constructor(private route: ActivatedRoute, 
    private service: FinancialCategoryService, 
    private notificationService: NotificationService,
    private localizationService: LocalizationService) 
  { }

  /**
   * @inheritdoc
   */
  public ngOnInit()
  {
    this.route.params.pipe(
      map(param => param["id"] as string),
      switchMap(id => this.service.get(id)),
      tap(reply => 
      {
        if (!reply.successful)
          this.notificationService.notifyErrorMessage(reply.message);
      }),
      map(reply => reply.result)
    ).subscribe(category => this.entity = category);
  }
}