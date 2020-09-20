import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

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
    this._client.post(this.path, parameter);
  }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   */
  update(parameter: TModel) {
    this._client.put(this.path, parameter);
  }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   */
  delete(id: string) {
    this._client.delete(this.path, id as Object);
  }

  /**
   * Retrieves all exisiting models
   * 
   * @param {Object} parameter The search parameters
   */
  retrieve(parameter: Object = null): Observable<TModel[]> {
    if (parameter)
      return this._client.get<TModel[]>(this.path);
    else
      return this._client.get<TModel[]>(this.path, parameter);
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   */
  get(id: string): Observable<TModel> {
      return this._client.get<TModel>(this.path, id as Object);
  }
}
