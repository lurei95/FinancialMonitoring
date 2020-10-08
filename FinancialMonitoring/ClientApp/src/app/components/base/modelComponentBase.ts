import { NotificationService } from './../../services/utility/notification.service';
import { IModel } from './../../models/iModel';
import { Observable } from "rxjs";
import { ModelServiceBase } from "src/app/services/modelServiceBase";
import { map, tap } from 'rxjs/operators';
import { LocalizationService } from 'src/app/services/utility/localization.service';

export abstract class ModelComponentBase<TModel extends IModel>
{
  /**
   * Constructor
   * 
   * @param {ModelServiceBase<TEntity>} service: Injected: ModelServiceBase<TEntity>
   * @param {LocalizationService} localizationService: Injected: LocalizationService
   * @param {NotificationService} notificationService: Injected: NotificationService
   */
  constructor(protected service: ModelServiceBase<TModel>,
    protected localizationService: LocalizationService,
    protected notificationService: NotificationService)
  { }

  /**
   * Deletes an entity
   * 
   * @param {TModel} model The model to delete
   * @returns {Observable<boolean>} Wether the entity was saved successfully
   */
  protected delete(model: TModel) : Observable<boolean>
  {
    return this.service.delete(model.getId()).pipe(
      tap(reply => 
      {
        if (reply.successful)
        {
          const message = this.localizationService.execute(model.constructor.name + ".DeleteMessage");
          this.notificationService.notifySuccessMessage(message);
        }
        else
          this.notificationService.notifyErrorMessage(reply.message);
      }),
      map(reply => reply.successful)
    );  
  }
}