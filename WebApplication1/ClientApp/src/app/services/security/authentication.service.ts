import { environment } from './../../../environments/environment';
import { Observable, of } from 'rxjs';
import { UserStore } from '../../store/security/user.store';
import { RefreshRequest } from '../../models/security/refreshRequest.model';
import { UserQuery } from '../../store/security/user.query';
import { UserModel } from '../../models/security/user.model';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
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
   * @param {HttpClient} client Injected: The http client
   * @param {UserStore} store Injected: User store
   * @param {UserQuery} query Injected: User query
   */
  constructor(private client: HttpClient, private store: UserStore, query: UserQuery) 
  { query.selectUser$.subscribe(user => this._currentUser = user); }

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