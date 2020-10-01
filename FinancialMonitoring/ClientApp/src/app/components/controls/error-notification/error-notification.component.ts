import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.css']
})
export class ErrorNotificationComponent
{
  private _error: string;
  /**
   * @returns {string} The error text
   */
  get error(): string { return this._error; }
  /**
   * @param {string} value The error text
   */
  @Input() set error(value: string) { this._error = value; }
}