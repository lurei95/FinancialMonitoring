import { UserModel } from './../../models/security/user.model';
import { Injectable } from '@angular/core';
import { StoreConfig, Store} from '@datorama/akita';

/**
 * State of the current user
 */
export interface UserState
{ 
  /**
   * The current user
   */
  user: UserModel;
}

/**
 * Creates the initial state for the @see UserStore
 * 
 * @returns The initial state
 */
export function createInitialState(): UserState { return { user: null }; }

/**
 * The user store
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'users' })
export class UserStore extends Store<UserState> 
{
  /**
   * Constructor
   */
  constructor() { super(createInitialState()); }
}