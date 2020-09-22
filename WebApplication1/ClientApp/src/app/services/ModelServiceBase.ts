import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from "./security/authentication.service";

/**
 * Interface of a service for deleting a model
 */
export abstract class ModelServiceBase<TModel>
{
  /**
   * @returns {string} The path for the corresponding model
   */
  protected abstract get modelPath(): string;

  /**
   * @returns {string} The full api path
   */
  protected get path(): string { return environment.apiEndpoint + this.modelPath; }

  /**
   * Constructor
   * 
   * @param {HttpClient} client Injected: The http client
   * @param {AuthenticationService} authenticationService Injected: Service for authentication
   */
  constructor(protected client: HttpClient, private authenticationService: AuthenticationService) 
  { }

  /**
   * Creates the model
   * 
   * @param {TModel} parameter Model to create
   */
  create(parameter: TModel) 
  { this.sendRequest((options) => this.client.post(this.path, parameter, options)); }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   */
  update(parameter: TModel) 
  { this.sendRequest((options) => this.client.put(this.path, parameter, options)); }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   */
  delete(id: string) 
  { this.sendRequest((options) => this.client.delete(this.path + "/" + id, options)); }

  /**
   * Retrieves all exisiting models
   * 
   * @param {[{ name: string, value: Object }]} parameters The search parameters
   */
  retrieve(parameters: [{ name: string, value: Object }] = null): Observable<TModel[]> 
  {
    let path: string = this.path;
    if (parameters)
      path += + '/?param=' + encodeURIComponent(JSON.stringify(parameters));

    return this.sendRequest<TModel[]>((options) => this.client.get<TModel[]>(path, options));
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   */
  get(id: string): Observable<TModel> 
  {
    return this.sendRequest<TModel>(
      (options) => this.client.get<TModel>(this.path + "/" + id, options));
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
    return { 
      headers: new HttpHeaders().set('Authorization',  `Bearer ${accessToken}`) 
    };
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      'Something bad happened; please try again later.');
  }
}