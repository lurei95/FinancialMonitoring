import { RequiredValidator } from './../../../../services/validation/required-validator.service';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { DirectionKind } from './../../../../models/finance/directionKind';
import { OccurenceKind } from './../../../../models/finance/occurenceKind';
import { MaskKind } from './../../../controls/text-edit/mask-kind';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialItemService } from './../../../../services/finance/financialItem.service';
import { Component, Inject } from '@angular/core';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditComponentsBase } from 'src/app/components/base/editComponentBase';

/**
 * Dialog for editing or creating a @see FinancialItemModel
 */
@Component({
  selector: 'app-financial-item-edit-dialog',
  templateUrl: './financial-item-edit-dialog.component.html',
  styleUrls: ['./financial-item-edit-dialog.component.css']
})
export class FinancialItemEditDialogComponent extends EditComponentsBase<FinancialItemModel>
{
  private get title(): string 
  { return this.localizationService.execute("FinancialItem_Title", { title: this.entity.title }); } 

  private maskKind = MaskKind.Currency

  private titleValidator: (param: any) => string;

  private valueValidator: (param: any) => string;

  private get value():string { return this.entity.value.toString(); }

  private set value(value: string)
  {
    let number: number = Number(value);
    if (number)
      this.entity.value = number;
  }

  private occurenceKindType = OccurenceKind

  private directionKindType = DirectionKind

  /**
   * Constructor
   * 
   * @param {FinancialItemModel} data: Injected: Model passed as dialog parameter
   * @param {FinancialItemService} service Injected: FiancialItemService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {RequiredValidator} requiredValidatorInjected: Injected: RequiredValidator
   * @param {LocalizationService} localizationService Injected: LocalizationService
   * @param {MatDialogRef<FinancialItemEditDialogComponent>} self Injected: dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: FinancialItemModel,
    service: FinancialItemService, 
    notificationService: NotificationService,
    requiredValidator: RequiredValidator,
    private localizationService: LocalizationService,
    private self: MatDialogRef<FinancialItemEditDialogComponent>) 
  { 
    super(service, notificationService);
    this.entity = data;
    this.titleValidator = requiredValidator.getValidator("FinancialItem.Title");
    this.valueValidator = requiredValidator.getValidator("FinancialItem.Value");
  }

  private saveAndClose()
  {
    this.saveChanges().subscribe(result =>
    {
      if (result)
        close();
    })
  }

  private close() { this.self.close(); }

  private onOccurenceKindChanged(occurenceKind: OccurenceKind) 
  { this.entity.occurenceKind = occurenceKind; }

  private onDirectionKindChanged(directionKind: DirectionKind) 
  { this.entity.direction = directionKind; }

  private handleDateChanged(date: Date) { this.entity.dueDate = date; }
}