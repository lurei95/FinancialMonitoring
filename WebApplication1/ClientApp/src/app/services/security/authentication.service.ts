import { ApiService } from './../utility/api.service';
import { ApiReply } from './../../models/utility/apiReply';
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

  private get path(): string { return environment.apiEndpoint + "Users/"; }

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
    return this.apiService.post<UserModel>(this.path + "Login", user).pipe(tap(reply => 
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
    return this.apiService.post<UserModel>(this.path + "Signup", user).pipe(tap(reply => 
    { 
      if(reply.successful)
        this.store.update({ user: reply.result })
    }));
  }

  private refreshAccessToken() : Observable<string>
  {
    const request = new RefreshRequest(this._currentUser.accessToken, this._currentUser.refreshToken);
    return this.apiService.post<UserModel>(this.path + "RefreshToken", request).pipe(
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
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}