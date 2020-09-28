import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * A simple text edit
 */
@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css']
})
export class TextEditComponent
{
  /**
   * The caption of the edit
   */
  @Input() caption: string;

  /**
   * The width of the caption area
   */
  @Input() captionWidth: number;

  /**
   * The max length of the input text
   */
  @Input() maxLength: number;

  private _value: string;
  /**
   * @returns {string} The value
   */
  get value(): string { return this._value; }
  /**
   * @param {string} value The value
   */
  @Input() set value(value: string) 
  { 
    if (this._value != value)
    {
      this._value = value;
      this.valueChange.emit(value);
    }
  }

  /**
   * The text change event
   */
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
}
