import { NotificationModel } from './../models/utility/notification.model';
import { Injectable } from '@angular/core';
import { StoreConfig, Store} from '@datorama/akita';

/**
 * State of the current notification
 */
export interface NotificationState
{ 
  /**
   * The currently displayed notification
   */
  notification: NotificationModel;
}

/**
 * Creates the initial state for the @see NotificationStore
 * 
 * @returns The initial state
 */
export function createInitialState(): NotificationState { return { notification: null }; }

/**
 * The notification store
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'notifications' })
export class NotificationStore extends Store<NotificationState> 
{
  /**
   * Constructor
   */
  constructor() { super(createInitialState()); }
}