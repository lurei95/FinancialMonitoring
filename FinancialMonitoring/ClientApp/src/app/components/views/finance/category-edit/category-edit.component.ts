import { RequiredValidator } from './../../../../services/validation/required-validator.service';
import { AttachmentItemModel } from './../../../../models/finance/attachmentItem.model';
import { MatDialog } from '@angular/material/dialog/';
import { DataGridComponent } from './../../../data/data-grid/data-grid.component';
import { FinancialCategoryModel } from 'src/app/models/finance/financialCatgegory.model';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialCategoryService } from './../../../../services/finance/financialCategory.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatTableDataSource } from '@angular/material';
import { map, switchMap, tap } from 'rxjs/operators';
import { FinancialItemEditDialogComponent } from '../financial-item-edit-dialog/financial-item-edit-dialog.component';
import { ApiReply } from 'src/app/models/utility/apiReply';

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

  private itemColumns: string[] = ["new", "title", "direction", "value", "due", "edit", "delete"];

  private attachmentColumns: string[] = ["new", "title", "addedDate", "delete"];

  private itemsDataSource: MatTableDataSource<FinancialItemModel> = new MatTableDataSource();

  private attachmentsDataSource: MatTableDataSource<AttachmentItemModel> = new MatTableDataSource();

  private titleValidator: (param: any) => string;

  @ViewChild('itemGrid', {static: false}) private itemGrid: DataGridComponent;

  @ViewChild('attachmentGrid', {static: false}) private attachmentGrid: DataGridComponent;

  private _entity: FinancialCategoryModel;
  /**
   * @param {FinancialCategoryModel} value The category which is bein edited
   */
  set entity(value: FinancialCategoryModel)
  { 
    this._entity = value;
    this.itemsDataSource.data = value.items; 
    this.attachmentsDataSource.data = value.attachments;
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
   * @param {RequiredValidator} requiredValidator Injected: RequiredValidator
   * @param {Router} router Injected: Router
   * @param {MatDialog} dialog Injected: MatDialog
   */
  constructor(private route: ActivatedRoute, 
    private service: FinancialCategoryService, 
    private notificationService: NotificationService,
    private localizationService: LocalizationService,
    requiredValidator: RequiredValidator,
    private router: Router, private dialog: MatDialog) 
  { this.titleValidator = requiredValidator.getValidator("FinancialCategory.Title"); }

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

  private deleteItem(model: FinancialItemModel)
  { 
    this.itemGrid.removeItem(model);
    const index = this.entity.items.indexOf(model);
    if (index > -1)
      this.entity.items.splice(index, 1);
  }

  private deleteAttachment(model: AttachmentItemModel)
  { 
    this.attachmentGrid.removeItem(model);
    const index = this.entity.attachments.indexOf(model);
    if (index > -1)
      this.entity.attachments.splice(index, 1);
  }

  private editItem(model: FinancialItemModel)
  { this.router.navigateByUrl(this.router.url + "/Items/" + model.financialItemId); }

  private newItem()
  { 
    let item: FinancialItemModel = new FinancialItemModel();
    item.categoryId = this.entity.financialCategoryId;
    this.dialog.open(FinancialItemEditDialogComponent, {
      panelClass: 'fullscreenDialog',
      data: item,
      disableClose: true
    });
  }

  private newAttachment()
  { 
    //Implement later
  }

  private handleApiReply(reply: ApiReply<any>)
  {
    if (!reply.successful)
      this.notificationService.notifyErrorMessage(reply.message);
  }
}