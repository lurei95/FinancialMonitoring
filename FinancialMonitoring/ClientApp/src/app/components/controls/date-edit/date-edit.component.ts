import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component for a date edit
 */
@Component({
  selector: 'app-date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.css']
})
export class DateEditComponent
{
  private static minDate: Date = new Date(-8640000000000000);

  private static maxDate: Date = new Date(8640000000000000);

  /**
   * The caption of the edit
   */
  @Input() caption: string;

  /**
   * The width of the caption area
   */
  @Input() captionWidth: number;

  private _selectedDate: Date = new Date(Date.now());
  /**
   * @param {Date} value The currently selected Date
   */
  @Input() set selectedDate(value: Date) { this._selectedDate = value; }
  /**
   * @returns {Date} The currently selected Date
   */
  get selectedDate() : Date { return this._selectedDate; }

  private _startDate: Date = new Date();
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input()  set startDate(value: Date) { this._startDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get startDate(): Date { return this._startDate; }

  private _minDate: Date = DateEditComponent.minDate;
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input() set minDate(value: Date) { this._minDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get minDate(): Date { return this._minDate; }

  private _maxDate: Date = DateEditComponent.maxDate;
  /**
   * @param {Date} value The start date of the date picker
   */
  @Input() 
  set maxDate(value: Date) { this._maxDate = value; }
  /**
   * @returns {Date} The start date of the date picker
   */
  get maxDate(): Date { return this._maxDate; }

  private _startView: string = "month";
  /**
   * @param {string} value The start view of the date picker
   */
  @Input() set startView(value: string) { this._startView = value; }
  /**
   * @returns {string} The start view of the date picker
   */
  get startView(): string { return this._startView; }

  /**
   * Date change event
   */
  @Output() dateChanged = new EventEmitter<Date>();

  private handleDateChange(dateText: string) 
  { 
    let date = Date.parse(dateText);
    if(!isNaN(date))
    {
      this.selectedDate = new Date(dateText);
      this.dateChanged.emit(this.selectedDate); 
    }
  }
}