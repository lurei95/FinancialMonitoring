import { HttpClient } from '@angular/common/http';
import { UserModel } from './../../models/security/user.model';
import { environment } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { UserStore } from '../../store/security/user.store';
import { RefreshRequest } from '../../models/security/refreshRequest.model';
import { UserQuery } from '../../store/security/user.query';
import { Injectable } from "@angular/core";
import { tap, map } from 'rxjs/operators';

/**
 * Service for handling authentication
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService 
{
  private _currentUser: UserModel;

  /**
   * @returns {Observable<string>} Observable for the current access token
   */
  get accessToken$(): Observable<string>
  {
    if (!this._currentUser)
      return of(null);
    if (!this.tokenExpired(this._currentUser.accessToken))
      return of(this._currentUser.accessToken);
    return this.refreshAccessToken();
  }

  /**
   * Constructor
   * 
   * @param {HttpClient} client Injected: Httpclient
   * @param {UserStore} store Injected: User store
   * @param {UserQuery} query Injected: User query
   */
  constructor(private client: HttpClient, private store: UserStore, query: UserQuery) 
  { query.selectUser$.subscribe(user => this._currentUser = user); }

  /**
   * Tries to log the user in
   * 
   * @param {UserModel} user the user
   */
  public login(user: UserModel) : Observable<{ successfull: boolean, message: string}>
  {
    return this.client.post<UserModel>(environment.apiEndpoint + "Users/Login", user).pipe(
      tap(user => this.store.update({ user: user })),
      map(user => { return { successfull: true, message: null }})
    );
  }

  /**
   * Tries to sign the user up
   * 
   * @param {UserModel} user the user
   */
  public signup(user: UserModel) : Observable<{ successfull: boolean, message: string}>
  {
    return this.client.post<UserModel>(environment.apiEndpoint + "Users/Signup", user).pipe(
      tap(user => this.store.update({ user: user })),
      map(user => { return { successfull: true, message: null }})
    );
  }

  private refreshAccessToken() : Observable<string>
  {
    const request = new RefreshRequest(this._currentUser.accessToken, this._currentUser.refreshToken);
    return this.client.post<UserModel>(environment.apiEndpoint + "Users/RefreshToken", request).pipe(
      tap(newUser => this.store.update({ user: newUser })), 
      map(newUser => newUser.accessToken)
    );
  }

  private tokenExpired(token: string) 
  {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}