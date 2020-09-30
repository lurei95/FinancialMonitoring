import { Input } from "@angular/core";

/**
 * Base class for an edit component
 */
export abstract class EditBase
{
  private _caption: string;
  /**
   * @returns {string} The caption of the edit
   */
  get caption(): string { return this._caption; }
  /**
   * @param {string} value The caption of the edit
   */
  @Input() set caption(value: string) { this._caption = value; }

  private _captionWidth: number;
  /**
   * @returns {number} The width of the caption area
   */
  get captionWidth(): number { return this._captionWidth; }
  /**
   * @param {number} value The width of the caption area
   */
  @Input() set captionWidth(value: number) { this._captionWidth = value; }

  private _isEnabled: boolean = true;
  /**
   * @returns {boolean} If the edit is enabled
   */
  get isEnabled(): boolean { return this._isEnabled; }
  /**
   * @param {boolean} value If the edit is enabled
   */
  @Input() set isEnabled(value: boolean) { this._isEnabled = value; }
}