import { Component, OnInit, ViewChild } from '@angular/core';
import { FinancialItemService } from 'src/app/services/finance/financialItem.service';
import { NotificationService } from 'src/app/services/utility/notification.service';
import { RequiredValidator } from 'src/app/services/validation/required-validator.service';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataGridComponent } from 'src/app/components/data/data-grid/data-grid.component';
import { MatTableDataSource } from '@angular/material';
import { AttachmentItemModel } from 'src/app/models/finance/attachmentItem.model';
import { FinancialItemEditComponentBase } from '../financialItemEditComponentBase';

/**
 * Component for a edit page for a @see FinancialItemModel
 */
@Component({
  selector: 'app-finanancial-item-edit',
  templateUrl: './financial-item-edit.component.html',
  styleUrls: ['./financial-item-edit.component.css']
})
export class FinancialItemEditComponent extends FinancialItemEditComponentBase implements OnInit
{
  private attachmentColumns: string[] = ["new", "title", "addedDate", "delete"];

  private attachmentsDataSource: MatTableDataSource<AttachmentItemModel> = new MatTableDataSource();

  @ViewChild('attachmentGrid', {static: false}) private attachmentGrid: DataGridComponent;

  /**
   * @param {FinancialItemModel} value The category which is bein edited
   */
  set entity(value: FinancialItemModel)
  { 
    super.entity = value;
    this.attachmentsDataSource.data = value.attachments;
  }
  /**
   * @returns {FinancialItemModel} The category which is bein edited
   */
  get entity(): FinancialItemModel { return super.entity; }

  /**
   * Constructor
   * 
   * @param {FinancialItemService} service Injected: FiancialItemService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {RequiredValidator} requiredValidatorInjected: Injected: RequiredValidator
   * @param {LocalizationService} localizationService Injected: LocalizationService
   * @param {ActivatedRoute} route Injected: ActivatedRoute
   */
  constructor(service: FinancialItemService, notificationService: NotificationService,
    requiredValidator: RequiredValidator, localizationService: LocalizationService,
    private route: ActivatedRoute) 
  { super(service, notificationService, requiredValidator, localizationService); }

  /**
   * @inheritdoc
   */
  public ngOnInit()
  {
    this.route.params.pipe(
      map(param => param["itemId"] as string),
      switchMap(id => this.service.get(id)),
      tap(reply => 
      {
        if (!reply.successful)
          this.notificationService.notifyErrorMessage(reply.message);
      }),
      map(reply => reply.result)
    ).subscribe(category => this.entity = category);
  }

  private deleteAttachment(model: AttachmentItemModel)
  { 
    this.attachmentGrid.removeItem(model);
    const index = this.entity.attachments.indexOf(model);
    if (index > -1)
      this.entity.attachments.splice(index, 1);
  }

  private newAttachment()
  { 
    //Implement later
  }
}
