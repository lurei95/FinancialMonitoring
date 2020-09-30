import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component for an edit dialog content
 */
@Component({
  selector: 'app-edit-dialog-content',
  templateUrl: './edit-dialog-content.component.html',
  styleUrls: ['./edit-dialog-content.component.css']
})
export class EditDialogContentComponent 
{
  /**
   * Close event
   */
  @Output() public close = new EventEmitter();

  /**
   * Save event
   */
  @Output() public save = new EventEmitter();

  /**
   * Save and close event
   */
  @Output() public saveAndClose = new EventEmitter();

  /**
   * The title of the dialog
   */
  @Input() public title: string = "";

  private _isExpanded: boolean;
  /**
   * @returns {boolean} Whether the dialog is in expanded mode or not
   */
  get isExpanded(): boolean { return this._isExpanded; }

  /**
   * Constructor
   */
  constructor() { }

  private handleExpandButtonClicked() 
  { this._isExpanded = !this._isExpanded; }

  private handleSaveShortcut(e: Event)
  {
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    this.save.emit();
  }

  private handleCloseButtonClicked(e: Event)
  {
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    this.close.emit();
  }

  private handleSaveAndCloseShortcut(e: Event)
  {
    if(e != null)
    {
      e.preventDefault();
      e.stopPropagation();
    }
    this.saveAndClose.emit();
  }
}