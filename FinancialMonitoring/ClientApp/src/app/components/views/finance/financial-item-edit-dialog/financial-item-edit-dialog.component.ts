import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from './../../../../services/utility/notification.service';
import { FinancialItemService } from './../../../../services/finance/financialItem.service';
import { Component } from '@angular/core';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';
import { MatDialogRef } from '@angular/material/dialog';

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
  private _entity: FinancialItemModel = new FinancialItemModel();

  /**
   * Constructor
   * 
   * @param {FinancialItemService} service Injected: FiancialItemService
   * @param {NotificationService} notificationService Injected: NotificationService
   * @param {MatDialogRef<FinancialItemEditDialogComponent>} self Injected: dialog
   */
  constructor(private service: FinancialItemService, 
    private notificationService: NotificationService,
    private self: MatDialogRef<FinancialItemEditDialogComponent>) 
  { }

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

  test()
  {
    console.log("change");
  }
}