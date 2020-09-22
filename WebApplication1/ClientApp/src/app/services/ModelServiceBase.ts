import { ApiService } from './utility/api.service';
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
  protected abstract get path(): string;

  /**
   * Constructor
   * 
   * @param {ApiService} apiService Injected: The service for making api calls
   */
  constructor(protected apiService: ApiService) 
  { }

  /**
   * Creates the model
   * 
   * @param {TModel} parameter Model to create
   * @returns {Observable<unknown>} Oberservable for the result of the api call
   */
  create(parameter: TModel): Observable<unknown> 
  { return this.apiService.post(this.path, parameter); }

  /**
   * Updates the model
   * 
   * @param {TModel} parameter Model to update
   * @returns {Observable<unknown>} Oberservable for the result of the api call
   */
  update(parameter: TModel): Observable<unknown> 
  { return this.apiService.put(this.path, parameter); }

  /**
   * Deletes the model
   * 
   * @param {any} id Id of the model to delete
   * @returns {Observable<unknown>} Oberservable for the result of the api call
   */
  delete(id: string): Observable<unknown>
  { return this.apiService.delete(this.path + "/" + id); }

  /**
   * Retrieves all exisiting models
   * 
   * @param {[{ name: string, value: Object }]} parameters The search parameters
   * @returns {Observable<TModel[]>} Oberservable for the list of models
   */
  retrieve(parameters: [{ name: string, value: Object }] = null): Observable<TModel[]> 
  {
    let path: string = this.path;
    if (parameters)
      path += + '/?param=' + encodeURIComponent(JSON.stringify(parameters));

    return this.apiService.get<TModel[]>(path);
  }

  /**
   * Retrieves the model
   * 
   * @param {any} id The id of the model
   * @returns {Observable<TModel>} Oberservable for the model
   */
  get(id: string): Observable<TModel> 
  { return this.apiService.get<TModel>(this.path + "/" + id); }
}