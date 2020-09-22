import { environment } from './../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../security/authentication.service';

/**
 * Service for making calls to the api
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  /**
   * 
   * @param {HttpClient} client Injected: The http client
   * @param {AuthenticationService} authenticationService Injected: Service for authentication
   */
  constructor(private client: HttpClient, private authenticationService: AuthenticationService)
  { }

  /**
   * Returns the complete url for the api call
   * 
   * @param {string} path The path from the base url
   * @returns {string} The complete url for the api call
   */
  public getUrl(path: string): string { return environment.apiEndpoint + path; }

  /**
   * Sends a get request to the api
   * 
   * @param {string} path The path from the base url
   * @returns {Observable<TResult>} The result of the api call
   */
  public get<TResult>(path: string): Observable<TResult> 
  {
    return this.sendRequest<TResult>(
      (options) => this.client.delete<TResult>(this.getUrl(path), options));
  }

  /**
   * Sends a put request to the api
   * 
   * @param {string} path The path from the base url
   * @param {any} parameter The parameter that is send in the request body
   * @returns {Observable<TResult>} The result of the api call
   */
  public put<TResult>(path: string, parameter: any): Observable<TResult> 
  {
    const url = this.getUrl(path)
    if (parameter)
      return this.sendRequest<TResult>((options) => this.client.put<TResult>(url, parameter, options));
    else
      return this.sendRequest<TResult>((options) => this.client.put<TResult>(url, options));
  }

  /**
   * Sends a put request to the api
   * 
   * @param {string} path The path from the base url
   * @param {any} parameter The parameter that is send in the request body
   * @returns {Observable<TResult>} The result of the api call
   */
  public post<TResult>(path: string, parameter: any): Observable<TResult> 
  {
    const url = this.getUrl(path)
    if (parameter)
      return this.sendRequest<TResult>((options) => this.client.post<TResult>(this.getUrl(path), parameter, options));
    else
      return this.sendRequest<TResult>((options) => this.client.post<TResult>(this.getUrl(path), options));
  }

  /**
   * Sends a delete request to the api
   * 
   * @param {string} path The path from the base url
   * @returns {Observable<TResult>} The result of the api call
   */
  public delete<TResult>(path: string): Observable<TResult> 
  {
    return this.sendRequest<TResult>(
      (options) => this.client.delete<TResult>(this.getUrl(path), options));
  }

  private sendRequest<TResult>(httpCall: (options: { headers: HttpHeaders }) => Observable<TResult>)
  : Observable<TResult> 
  {
    return this.authenticationService.accessToken$.pipe(
      switchMap(token => httpCall(this.getOptions(token))),
      catchError(this.handleError)
    );
  }

  private getOptions(accessToken: string): { headers: HttpHeaders }
  {
    if (accessToken)
      return { headers: new HttpHeaders().set('Authorization',  `Bearer ${accessToken}`) };
    return null;
  }

  private handleError(error: HttpErrorResponse) 
  {
    return throwError('Something bad happened; please try again later.');
  }
}