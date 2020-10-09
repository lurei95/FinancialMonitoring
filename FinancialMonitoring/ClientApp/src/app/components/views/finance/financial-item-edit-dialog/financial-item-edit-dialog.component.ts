import { RequiredValidator } from './../../../../services/validation/required-validator.service';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialItemService } from './../../../../services/finance/financialItem.service';
import { Component, Inject } from '@angular/core';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FinancialItemEditComponentBase } from '../financialItemEditComponentBase';

/**
 * Dialog for editing or creating a @see FinancialItemModel
 */
@Component({
  selector: 'app-financial-item-edit-dialog',
  templateUrl: './financial-item-edit-dialog.component.html',
  styleUrls: ['./financial-item-edit-dialog.component.css']
})
export class FinancialItemEditDialogComponent extends FinancialItemEditComponentBase
{
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
    localizationService: LocalizationService,
    private self: MatDialogRef<FinancialItemEditDialogComponent>) 
  { 
    super(service, notificationService, requiredValidator, localizationService);
    this.entity = data;
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
}