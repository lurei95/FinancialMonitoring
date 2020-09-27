import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogInformation } from './dialogInformation';

/**
 * Component for a message dialog
 */
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent 
{
  private _data: DialogInformation;
  /**
   * @returns {DialogInformation} The data of the dialog
   */
  get data(): DialogInformation { return this._data; }
  
  private _buttons: ButtonInformation[] = [];
  /**
   * @returns {ButtonInformation[]} The buttons the dialog should have
   */
  get buttons() : ButtonInformation[] { return this._buttons; }
  
  /**
   * Constructor
   * 
   * @param {DialogInformation} data Injected: The data of the dialog
   * @param {MatDialogRef<MessageDialogComponent>} self Injected: reference to the own dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) data: DialogInformation, 
    private self: MatDialogRef<MessageDialogComponent>) 
  { 
    this._data = data; 
    self.disableClose = true;
    data.buttons.forEach(item => 
    {
      let info = new ButtonInformation();
      info.result = item;
      info.caption = item
      this._buttons.push(info);
    });
  }
}

class ButtonInformation
{
  result: string;
  caption: string;
}