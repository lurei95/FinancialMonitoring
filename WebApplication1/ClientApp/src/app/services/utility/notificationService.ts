import { NotificationStore } from './../../store/notification.store';
import { NotificationKind } from './../../models/utility/notificationKind';
import { Injectable } from "@angular/core";
import { NotificationModel } from '../../models/utility/notification.model';

/**
 * Service for displaying notification messages
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService 
{
  /**
   * Constructor
   * 
   * @param {NotificationStore} store
   */
  constructor(private store: NotificationStore) { }

  /**
   * Notifies a success message
   * 
   * @param {string} message The message
   */
  public notifySuccessMessage(message: string)
  { this.notifyCore(message, NotificationKind.SuccessNotification); }

  /**
   * Notifies a information message
   * 
   * @param {string} message The message
   */
  public notifyInformationMessage(message: string)
  { this.notifyCore(message, NotificationKind.InformationNotification); }

  /**
   * Notifies a warning message
   * 
   * @param {string} message The message
   */
  public notifyWarningMessage(message: string)
  { this.notifyCore(message, NotificationKind.WarningNotification); }

  /**
   * Notifies a error message
   * 
   * @param {string} message The message
   */
  public notifyErrorMessage(message: string)
  { this.notifyCore(message, NotificationKind.ErrorNotification); }

  /**
   * Dismisses the current notification
   */
  public dismissNotification() { this.store.update({ notification: null }); }

  private notifyCore(message: string, notificationKind: NotificationKind)
  {
    this.store.update({ notification: new NotificationModel(message, notificationKind) });
    setTimeout(() => this.store.update({ notification: null }), 5000);
  }
}