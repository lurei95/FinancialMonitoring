import { LocalizationService } from 'src/app/services/utility/localization.service';
import { MaskKind } from './mask-kind';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditBase } from '../edit-base';

/**
 * A simple text edit
 */
@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.css']
})
export class TextEditComponent extends EditBase
{
  private get mask(): string 
  {
    switch (this._maskKind)
    {
      case MaskKind.Currency:
      case MaskKind.DecimalNumber:
        return '0*.00';
      case MaskKind.Number:
        return '*';
      default:
        return null;
    }
  } 

  private get suffix():string 
  { 
    switch (this._maskKind)
    {
      case MaskKind.Currency:
        return this.localizationService.currncySymbol;
      default:
        return null;
    }
  }

  private _maxLength: number = 20;
  /**
   * The max length of the input text
   */
  @Input() set maxLength(value: number) { this._maxLength = value; }
  /**
   * The max length of the input text
   */
  get maxLength(): number { return this._maxLength; }

  private _maskKind: MaskKind = MaskKind.None;
  /**
   * The mask of the edit
   */
  get maskKind(): MaskKind { return this._maskKind; }
  /**
   * The mask of the edit
   */
  @Input() set maskKind(value: MaskKind) { this._maskKind = value; };

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

  /**
   * Constructors
   * 
   * @param {LocalizationService} localizationService Injected: LocalizationService) 
   */
  constructor(private localizationService: LocalizationService)
  { super(); }
}
