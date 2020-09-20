import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

/**
 * Interface of a service for deleting a model
 */
export abstract class ModelServiceBase<TModel>
{
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    observe: 'response' as 'response'
  };

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
    this._client.post(this.path, parameter, this.httpOptions).subscribe((reply) => {
      //Error handling
    });
  }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   */
  update(parameter: TModel) {
    this._client.put(this.path, parameter, this.httpOptions).subscribe((reply) => {
      //Error handling
    });
  }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   */
  delete(id: string) {
    this._client.delete(this.path + "/" + id, this.httpOptions).subscribe((reply) => {
      //Error handling
    });
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

    return this._client.get<TModel[]>(path, this.httpOptions).pipe(map(value => {
      //Error handling
      return null;
    }));
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   */
  get(id: string): Observable<TModel> {
    return this._client.get<TModel>(this.path + "/" + id, this.httpOptions).pipe(map(value => {
      //Error handling
      return null;
    }));
  }
}
