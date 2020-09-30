import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditBase } from '../edit-base';

@Component({
  selector: 'app-check-edit',
  templateUrl: './check-edit.component.html',
  styleUrls: ['./check-edit.component.css']
})
export class CheckEditComponent extends EditBase
{
  private _checked: boolean;
  /**
   * @returns {boolean} If the check edit is checked
   */
  get checked(): boolean { return this._checked; }
  /**
   * @param {boolean} value If the check edit is checked
   */
  @Input() set checked(value: boolean) 
  { 
    if (this._checked != value)
    {
      this._checked = value;
      this.checkedChange.emit(value);
    }
  }

  /**
   * The checked change event
   */
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();
}
