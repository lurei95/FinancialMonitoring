import { EditComponentsBase as EditComponentBase } from 'src/app/components/base/editComponentBase';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FinancialItemService } from 'src/app/services/finance/financialItem.service';
import { NotificationService } from 'src/app/services/utility/notification.service';
import { RequiredValidator } from 'src/app/services/validation/required-validator.service';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { OccurenceKind } from 'src/app/models/finance/occurenceKind';
import { DirectionKind } from 'src/app/models/finance/directionKind';
import { DataGridComponent } from 'src/app/components/data/data-grid/data-grid.component';
import { MatTableDataSource } from '@angular/material';
import { AttachmentItemModel } from 'src/app/models/finance/attachmentItem.model';

/**
 * Component for a edit page for a @see FinancialItemModel
 */
@Component({
  selector: 'app-finanancial-item-edit',
  templateUrl: './financial-item-edit.component.html',
  styleUrls: ['./financial-item-edit.component.css']
})
export class FinancialItemEditComponent extends EditComponentBase<FinancialItemModel> implements OnInit
{
  private attachmentColumns: string[] = ["new", "title", "addedDate", "delete"];

  private titleValidator: (param: any) => string;

  private valueValidator: (param: any) => string;

  private occurenceKindType = OccurenceKind

  private directionKindType = DirectionKind

  private attachmentsDataSource: MatTableDataSource<AttachmentItemModel> = new MatTableDataSource();

  private get title(): string 
  { return this.localizationService.execute("FinancialItem_Title", { title: this.entity.title }); } 

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
  { 
    super(service, localizationService,notificationService);
    this.titleValidator = requiredValidator.getValidator("FinancialItem.Title");
    this.valueValidator = requiredValidator.getValidator("FinancialItem.Value");
  }

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

  private onOccurenceKindChanged(occurenceKind: OccurenceKind) 
  { this.entity.occurenceKind = occurenceKind; }

  private onDirectionKindChanged(directionKind: DirectionKind) 
  { this.entity.direction = directionKind; }

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

  private handleDateChanged(date: Date) { this.entity.dueDate = date; }
}
