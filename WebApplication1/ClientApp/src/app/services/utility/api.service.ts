import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient,  HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiReply } from 'src/app/models/utility/apiReply';

/**
 * Service for making calls to the api
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  /**
   * Constructor
   * 
   * @param {HttpClient} client Injected: The http client
   */
  constructor(private client: HttpClient)
  { }

  /**
   * Sends a get request to the api
   * 
   * @param {string} path The path from the base url
   * @param {HttpHeaders} HttpHeaders The http headers
   * @returns {Observable<ApiReply<TResult>>} The result of the api call
   */
  public get<TResult>(path: string, headers?: HttpHeaders): Observable<ApiReply<TResult>> 
  {
    return this.client.delete<string>(this.getUrl(path), { observe: 'response', headers: headers })
      .pipe(map(reply => this.handleReply(reply)));
  }

  /**
   * Sends a put request to the api
   * 
   * @param {string} path The path from the base surl
   * @param {any} parameter The parameter that is send in the request body
   * @param {HttpHeaders} HttpHeaders The http headers
   * @returns {Observable<ApiReply<TResult>>} The result of the api call
   */
  public put<TResult>(path: string, parameter: any, headers?: HttpHeaders): Observable<ApiReply<TResult>> 
  {
    return this.client.put<string>(this.getUrl(path), parameter, { observe: 'response', headers: headers })
      .pipe(map(reply => this.handleReply(reply)));
  }

  /**
   * Sends a put request to the api
   * 
   * @param {string} path The path from the base url
   * @param {any} parameter The parameter that is send in the request body
   * @param {HttpHeaders} HttpHeaders The http headers
   * @returns {Observable<ApiReply<TResult>>} The result of the api call
   */
  public post<TResult>(path: string, parameter: any, headers?: HttpHeaders): Observable<ApiReply<TResult>> 
  {
    return this.client.post<string>(this.getUrl(path), parameter, { observe: 'response', headers: headers })
      .pipe(map(reply => this.handleReply(reply)));
  }

  /**
   * Sends a delete request to the api
   * 
   * @param {string} path The path from the base url
   * @param {HttpHeaders} HttpHeaders The http headers
   * @returns {Observable<ApiReply<TResult>>} The result of the api call
   */
  public delete<TResult>(path: string, headers?: HttpHeaders): Observable<ApiReply<TResult>> 
  {
    return this.client.delete<string>(this.getUrl(path), { observe: 'response', headers: headers })
      .pipe(map(reply => this.handleReply(reply)));
  }

  private handleReply<TResult>(response: HttpResponse<string>) : ApiReply<TResult> 
  {
    //Internal Server error
    if (response.status == 500)
      return new ApiReply(null, false, response.body);
    if(response.ok)
      return new ApiReply(JSON.parse(response.body), true, null);
    throw new Error(response.body);
  }
  
  private getUrl(path: string): string { return environment.apiEndpoint + path; }
}