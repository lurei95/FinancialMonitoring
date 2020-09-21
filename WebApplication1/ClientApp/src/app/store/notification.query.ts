import { Query } from '@datorama/akita';
import { NotificationState, NotificationStore } from './notification.store';
import { Injectable } from '@angular/core';

/**
 * Query for @see NotificationStore
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationQuery extends Query<NotificationState> 
{ 
  /**
   * The selector for the current notification
   */
  selectNotification$ = this.select(state => state.notification); 

  /**
   * Constructor
   * 
   * @param {NotificationStore} store Injected: the store
   */
  constructor(protected store: NotificationStore) { super(store); }
}