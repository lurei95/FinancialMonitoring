import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserState, UserStore } from './user.store';
import { UserModel } from '../../models/security/user.model';

/**
 * Query for @see UserStore
 */
@Injectable({
  providedIn: 'root'
})
export class UserQuery extends Query<UserState> 
{ 
  /**
   * The selector for the current User
   */
  selectUser$: Observable<UserModel> = this.select(state => state.user); 

  /**
   * Constructor
   * 
   * @param {UserStore} store Injected: the store
   */
  constructor(protected store: UserStore) { super(store); }
}