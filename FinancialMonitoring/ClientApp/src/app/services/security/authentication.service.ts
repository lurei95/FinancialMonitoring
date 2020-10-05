import { ApiService } from './../utility/api.service';
import { ApiReply } from './../../models/utility/apiReply';
import { UserModel } from './../../models/security/user.model';
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

  private get path(): string { return "Users/"; }

  /**
   * Constructor
   * 
   * @param {ApiService} apiService Injected: ApiService
   * @param {UserStore} store Injected: User store
   * @param {UserQuery} query Injected: User query
   */
  constructor(private apiService: ApiService, private store: UserStore, query: UserQuery) 
  { query.selectUser$.subscribe(user => this._currentUser = user); }

  /**
   * Tries to log the user in
   * 
   * @param {UserModel} user the user
   * @returns {Observable<ApiReply<UserModel>>} The api reply
   */
  public login(user: UserModel) : Observable<ApiReply<UserModel>>
  {
    return this.apiService.post<UserModel>(this.path + "Login", user, UserModel).pipe(tap(reply => 
    { 
      if(reply.successful)
        this.store.update({ user: reply.result })
    }));
  }

  /**
   * Tries to sign the user up
   * 
   * @param {UserModel} user the user
   * @returns {Observable<ApiReply<UserModel>>} The api reply
   */
  public signup(user: UserModel) : Observable<ApiReply<UserModel>>
  {
    return this.apiService.post<UserModel>(this.path + "Signup", user, UserModel).pipe(tap(reply => 
    { 
      if(reply.successful)
        this.store.update({ user: reply.result })
    }));
  }

  /**
   * @returns {Observable<string>} Observable for the current access token
   */
  public getAccessToken(): Observable<string>
  {
    if (!this._currentUser)
      return of(null);
    if (!this.tokenExpired(this._currentUser.accessToken))
      return of(this._currentUser.accessToken);
    return this.refreshAccessToken();
  }

  private refreshAccessToken() : Observable<string>
  {
    const request = new RefreshRequest(this._currentUser.accessToken, this._currentUser.refreshToken);
    return this.apiService.post<UserModel>(this.path + "RefreshToken", request, UserModel).pipe(
      tap(reply => 
      { 
        if(reply.successful)
          this.store.update({ user: reply.result })
      }),
      map(reply => 
      { 
        if(reply.successful)
          return reply.result.accessToken;
        return null;
      })
    );
  }

  private tokenExpired(token: string) 
  {
    const tokenPart = token.split('.')[1];
    const decoded = atob(tokenPart);
    let expiry = JSON.parse(decoded).exp;
    if (!expiry)
      expiry = JSON.parse(decoded).iat;

    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}