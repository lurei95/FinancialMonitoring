import { ApiReply } from 'src/app/models/utility/apiReply';
import { Observable } from 'rxjs';
import { NotificationService } from './../../services/utility/notification.service';
import { map, tap } from "rxjs/operators";
import { ModelServiceBase } from "src/app/services/modelServiceBase";

export abstract class EditComponentsBase<TEntity>
{
  private _entity: TEntity;
  get entity(): TEntity { return this._entity; }
  set entity(value: TEntity) { this._entity = value; }

  private _isNew: boolean;
  get isNew(): boolean { return this._isNew; }
  set isNew(value: boolean) { this._isNew = value; }

  constructor(protected service: ModelServiceBase<TEntity>, 
    private notificationService: NotificationService)
  { }

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