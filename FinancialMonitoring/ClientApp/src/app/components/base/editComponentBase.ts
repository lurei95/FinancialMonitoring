import { services } from './../../services/services';
import { IModel } from './../../models/iModel';
import { LocalizationService } from 'src/app/services/utility/localization.service';
import { ApiReply } from 'src/app/models/utility/apiReply';
import { Observable } from 'rxjs';
import { NotificationService } from './../../services/utility/notification.service';
import { map, tap } from "rxjs/operators";
import { ModelServiceBase } from "src/app/services/modelServiceBase";
import { ModelComponentBase } from './modelComponentBase';

/**
 * Baseclass for a component to edit an entity
 */
export abstract class EditComponentsBase<TEntity extends IModel> extends ModelComponentBase<TEntity>
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
   * @param {LocalizationService} localizationService: Injected: LocalizationService
   * @param {NotificationService} notificationService: Injected: NotificationService
   */
  constructor(service: ModelServiceBase<TEntity>,
    localizationService: LocalizationService, 
    notificationService: NotificationService)
  { super(service, localizationService, notificationService); }

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
          const message = this.localizationService
            .execute(this.entity.constructor.name + ".SaveMessage", { name: this.entity.getDisplyName()});
          this.notificationService.notifySuccessMessage(message);
          this.entity = reply.result;
        }
        else
          this.notificationService.notifyErrorMessage(reply.message);
      }),
      map(reply => reply.successful)
    );  
  }
} 