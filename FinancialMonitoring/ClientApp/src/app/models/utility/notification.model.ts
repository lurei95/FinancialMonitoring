import { NotificationKind } from './notificationKind';

/**
 * Model for a notification message
 */
export class NotificationModel
{
  /**
   * @returns The message
   */
  get message(): string { return this._message; }
  /**
   * @param message The message
   */
  set message(value: string) { this._message = value; }

  /**
   * @returns The kind of the notification
   */
  get notificationKind(): NotificationKind { return this._notificationKind; }
  /**
   * @param value The kind of the notification
   */
  set notificationKind(value: NotificationKind) { this._notificationKind = value; }

  /**
   * Constructor
   * 
   * @param _message The message
   * @param _notificationKind The kind of the notification
   */
  constructor(private _message: string, private _notificationKind: NotificationKind) { }
}