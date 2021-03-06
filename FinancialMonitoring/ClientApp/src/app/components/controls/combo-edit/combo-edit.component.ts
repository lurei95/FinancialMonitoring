import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { EditBase } from '../edit-base';

/**
 * Component for combo edit
 */
@Component({
  selector: 'app-combo-edit',
  templateUrl: './combo-edit.component.html',
  styleUrls: ['./combo-edit.component.css', '../edits.css']
})
export class ComboEditComponent extends EditBase implements OnChanges
{
  private _options: {editValue: string, displayValue: string}[] = [];
  /**
   * @returns {{editValue: string, displayValue: string}[]} The selectable options of the ComboBox
   */
  get options(): { editValue: string, displayValue: string; }[] { return this._options; }
  
  /**
   * @param {{editValue: string, displayValue: string}[]} value The selectable options of the ComboBox
   */
  set options(value: { editValue: string, displayValue: string; }[]) { this._options = value; }

  /**
   * @param {any} value The type of the enum used for generating the selectable options 
   */
  @Input() set enumType(value: any)
  {
    Object.keys(value).forEach(key => 
    {
      let isNumber = parseInt(key, 10) >= 0
      if (!isNumber)
        this._options.push({editValue: key, displayValue: this.localizationService.execute(key)});
    });
  }

  private _selectedValue: string;
  /**
   * @returns {string} The selected value
   */
  get selectedValue(): string { return this._selectedValue; }
  /**
   * @param {string} value The selected value
   */
  @Input() set selectedValue(value: string) 
  { 
    if (this._selectedValue != value)
    {
      if (this.validator)
        this.error = this.validator(value);
      this._selectedValue = value;
      this.selectedValueChanged.emit(value);
    }
  }

  /**
   * Selected value changed event
   */
  @Output() selectedValueChanged = new EventEmitter<string>();

  /**
   * Constructor
   * 
   * @param {LocalizationService} localizationService Injected: service for providing localized strings
   */
  constructor(private localizationService: LocalizationService) 
  { super() }

  /**
   * @inheritdoc
   */
  public ngOnChanges() 
  {
    if (this.validator)
      this.error = this.validator(this.selectedValue);
  }
}
