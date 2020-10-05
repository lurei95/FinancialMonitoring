import { AuthenticationService } from './security/authentication.service';
import { ApiService } from './utility/api.service';
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ApiReply } from '../models/utility/apiReply';

/**
 * Interface of a service for deleting a model
 */
export abstract class ModelServiceBase<TModel>
{
  /**
   * @returns {string} The path for the corresponding model
   */
  protected abstract get path(): string;

  /**
   * @returns {(new () => TModel)} The type of the model
   */
  protected abstract get type(): (new () => TModel);

  /**
   * Constructor
   * 
   * @param {ApiService} apiService Injected: The service for making api calls
   * @param {AuthenticationService} authenticationService Injected AuthenticationService
   */
  constructor(protected apiService: ApiService, protected authenticationService: AuthenticationService) 
  { }

  /**
   * Creates the model
   * 
   * @param {TModel} parameter Model to create
   * @returns {Observable<ApiReply<unknown>>} Oberservable for the result of the api call
   */
  create(parameter: TModel): Observable<ApiReply<unknown>> 
  { 
    return this.withAuthentication(
      (headers) => this.apiService.post(this.path, parameter, this.type, headers)); 
  }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   * @returns {Observable<ApiReply<unknown>>} Oberservable for the result of the api call
   */
  update(parameter: TModel): Observable<ApiReply<unknown>> 
  { 
    return this.withAuthentication(
      (headers) => this.apiService.put(this.path, parameter, this.type, headers)); 
  }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   * @returns {Observable<ApiReply<unknown>>} Oberservable for the result of the api call
   */
  delete(id: string): Observable<ApiReply<unknown>>
  { 
    return this.withAuthentication(
      (headers) => this.apiService.delete(this.path + "/" + id, this.type, headers)); 
  }

  /**
   * Retrieves all exisiting models
   * 
   * @param {[{ name: string, value: Object }]} parameters The search parameters
   * @returns {Observable<ApiReply<TModel[]>>} Oberservable for the list of models
   */
  retrieve(parameters: [{ name: string, value: Object }] = null): Observable<ApiReply<TModel[]>> 
  {
    let path: string = this.path;
    if (parameters)
      path += + '/?param=' + encodeURIComponent(JSON.stringify(parameters));

    return this.withAuthentication((headers) => this.apiService.get<TModel[]>(path, Array, headers));
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   * @returns {Observable<ApiReply<TModel>>} Oberservable for the model
   */
  get(id: string): Observable<ApiReply<TModel>> 
  { 
    return this.withAuthentication<TModel>(
      (options) => this.apiService.get<TModel>(this.path + "/" + id, this.type, options)); 
  }

  /**
   * Performs the call with the authentication header
   * 
   * @param call The call
   * @returns {Observable<ApiReply<TResult>>} Result of the call
   */
  protected withAuthentication<TResult>(call: (headers: HttpHeaders) => Observable<ApiReply<TResult>>)
    : Observable<ApiReply<TResult>> 
  {
    return this.authenticationService.getAccessToken()
      .pipe(switchMap(token => call(this.getOptions(token))));
  }

  private getOptions(accessToken: string): HttpHeaders 
  {
    if (accessToken)
      return new HttpHeaders().set('Authorization',  `Bearer ${accessToken}`);
    return null;
  }
}