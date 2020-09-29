import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialItemService } from './../../../../services/finance/financialItem.service';
import { Component, Inject } from '@angular/core';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog for editing or creating a @see FinancialItemModel
 */
@Component({
  selector: 'app-financial-item-edit-dialog',
  templateUrl: './financial-item-edit-dialog.component.html',
  styleUrls: ['./financial-item-edit-dialog.component.css']
})
export class FinancialItemEditDialogComponent
{
  private _entity: FinancialItemModel;

  /**
   * Constructor
   * 
   * @param {FinancialItemModel} data: Injected: Model passed as dialog parameter
   * @param {FinancialItemService} service Injected: FiancialItemService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {MatDialogRef<FinancialItemEditDialogComponent>} self Injected: dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: FinancialItemModel,
    private service: FinancialItemService, 
    private notificationService: NotificationService,
    private self: MatDialogRef<FinancialItemEditDialogComponent>) 
  { this._entity = data; }

  private saveAndClose()
  {
    this.save().subscribe(result =>
    {
      if (result)
        close();
    })
  }

  private close() { this.self.close(); }

  private save() : Observable<boolean>
  {
    return this.service.create(this._entity).pipe(
      tap(reply => 
      {
        if (reply.successful)
        {
          //Display success message
          return true;
        }
        else
          this.notificationService.notifyErrorMessage(reply.message);
        return false;
      }),
      map(reply => reply.successful)
    );  
  }

  private handleDateChanged(date: Date) { this._entity.dueDate = date; }
}