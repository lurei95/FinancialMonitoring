
import { DialogInformation } from "src/app/components/utility/message-dialog/dialogInformation";
import { DialogResult } from "src/app/components/utility/message-dialog/dialogResult";
import { MessageDialogComponent } from "src/app/components/utility/message-dialog/message-dialog.component";
import { MatDialog } from '@angular/material/dialog/';
import { Injectable } from "@angular/core";

/**
 * Service for showing a message dialog
 */
@Injectable({
  providedIn: 'root'
})
export class MessageDialogService
{
  /**
   * Constructor
   * 
   * @param {MatDialog} dialog Injected: service for showing a dialog
   */
  constructor(private dialog: MatDialog) 
  { }

  /**
   * Displays a message dialog
   * 
   * @param {string} title The title of the dialog
   * @param {string} text The text of the dialog
   * @param {DialogResult[]} buttons The buttons the dialog should have
   * @param {(result: DialogResult) => void} callback Callback function when the dialog is closed
   */
  execute(title: string, text: string, buttons: DialogResult[], 
    callback: (result: DialogResult) => void)
  {
    let data = new DialogInformation(text, title, buttons);
    const dialogRef = this.dialog.open(MessageDialogComponent, { data: data, disableClose: true });
    dialogRef.afterClosed().subscribe(result => callback(result));
  }
}