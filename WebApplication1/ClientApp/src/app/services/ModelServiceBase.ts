import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

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
   * @param {HttpClient} _client Injected: The http client
   */
  constructor(private _client: HttpClient) { }

  /**
   * Creates the model
   * 
   * @param {TModel} parameter Model to create
   */
  create(parameter: TModel) {
    this._client.post(this.path, parameter).pipe(catchError(this.handleError));
  }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   */
  update(parameter: TModel) {
    this._client.put(this.path, parameter).pipe(catchError(this.handleError));
  }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   */
  delete(id: string) {
    this._client.delete(this.path + "/" + id).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves all exisiting models
   * 
   * @param {[{ name: string, value: Object }]} parameters The search parameters
   */
  retrieve(parameters: [{ name: string, value: Object }] = null): Observable<TModel[]> {
    let path: string = this.path;
    if (parameters)
      path += + '/?param=' + encodeURIComponent(JSON.stringify(parameters));

    return this._client.get<TModel[]>(path).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   */
  get(id: string): Observable<TModel> {
    return this._client.get<TModel>(this.path + "/" + id).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      'Something bad happened; please try again later.');
  }
}
