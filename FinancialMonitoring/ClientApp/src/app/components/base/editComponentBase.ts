import { ApiReply } from 'src/app/models/utility/apiReply';
import { Observable } from 'rxjs';
import { NotificationService } from './../../services/utility/notification.service';
import { map, tap } from "rxjs/operators";
import { ModelServiceBase } from "src/app/services/modelServiceBase";

/**
 * Baseclass for a component to edit an entity
 */
export abstract class EditComponentsBase<TEntity>
{
  private _entity: TEntity;
  /**
   * @returns {TEntity} The entity
   */
  get entity(): TEntity { return this._entity; }
  /**
   * @param {TEntity} value The entity
   */
  set entity(value: TEntity) { this._entity = value; }

  private _isNew: boolean;
  /**
   * @returns {boolean} Wether the entity is new
   */
  get isNew(): boolean { return this._isNew; }
  /**
   * @param {boolean} value Wether the entity is new
   */
  set isNew(value: boolean) { this._isNew = value; }

  /**
   * Constructor
   * 
   * @param {ModelServiceBase<TEntity>} service: Injected: ModelServiceBase<TEntity>
   * @param {ModelServiceBase<TEntity>} notificationService: Injected: NotificationService
   */
  constructor(protected service: ModelServiceBase<TEntity>, 
    protected notificationService: NotificationService)
  { }

  /**
   * Saves the changes of the current entity
   * 
   * @returns {Observable<boolean>} Wether the entity was saved successfully
   */
  protected saveChanges() : Observable<boolean>
  {
    let observable: Observable<ApiReply<any>>
    if (this.isNew)
      observable = this.service.create(this.entity);
    else
      observable = this.service.update(this.entity);

    return observable.pipe(
      tap(reply => 
      {
        if (reply.successful)
        {
          //Display success message
          return true;
        }
        else
          this.notificationService.notifyErrorMessage(reply.message);
        return false;
      }),
      map(reply => reply.successful)
    );  
  }
} 