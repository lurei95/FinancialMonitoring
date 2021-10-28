import { 
  coerceArray, 
  EntityState, 
  EntityStore, 
  getEntityType, 
  getIDType,
  isEmpty, 
  OrArray, 
  StoreConfigOptions 
} from "@datorama/akita";
import { produce } from "immer";
import { isFunction } from "util";

export abstract class CacheableEntityStore<
  S extends EntityState = any,
  EntityType = getEntityType<S>,
  IDType = getIDType<S>
> extends EntityStore<S> {
  private cacheExpirationDateMap = new Map<string, Date>();

  constructor(private cacheTime, initialState?: S, options?: Partial<StoreConfigOptions>) {
    super(initialState, options);
    this.akitaPreAddEntity = this.akitaPreAddEntity.bind(this);
    this.akitaPreUpdateEntity = this.akitaPreUpdateEntity.bind(this);
  }

  reset() {
    this.clearExpirationDates();
    super.reset();
  }

  clearExpirationDates() {
    this.cacheExpirationDateMap.clear();
  }

  getExpirationDate(key: string): Date | null {
    if (this.cacheExpirationDateMap.has(key))
      return this.cacheExpirationDateMap.get(key) ?? null;
    return null;
  }

  setNewExpirationDate(key: string) {
    this.cacheExpirationDateMap.set(key, this.getNewExpirationDate());
  }

  akitaPreAddEntity(newEntity: any) {
    if (Object.isFrozen(newEntity)) {
      newEntity = produce(newEntity, draftState => {
        draftState.cacheExpirationDate = this.getNewExpirationDate();
      });
    } else {
      newEntity.cacheExpirationDate = this.getNewExpirationDate();
    }

    return newEntity;
  }

  akitaPreUpdateEntity(prevEntity: any, nextEntity: any) {
    if (Object.isFrozen(nextEntity)) {
      nextEntity = produce(nextEntity, draftState => {
        draftState.cacheExpirationDate = this.getNewExpirationDate();
      });
    } else {
      nextEntity.cacheExpirationDate = this.getNewExpirationDate();
    }

    return nextEntity;
  }

  protected getEntities(
    idsOrFn?: OrArray<IDType> | ((entity: Readonly<EntityType>) => boolean)
  ): EntityType[] {
    const storeValue = this.getValue();

    if (isEmpty(storeValue.ids))
      return [];

    let ids: IDType[] = storeValue.ids ?? [];
    if (isFunction(idsOrFn)) {
      var func = idsOrFn as (entity: Readonly<EntityType>) => boolean;
      ids = (storeValue as any).ids.filter(entityId => 
        func(storeValue?.entities ? [entityId] : (null as any))
      );
    } else if (idsOrFn != null) {
      ids = coerceArray(idsOrFn as OrArray<IDType>);
    }

    if (isEmpty(ids))
      return [];

    const entities: EntityType[] = [];

    if (ids != null && storeValue.entities != null) {
      for (const id of ids) {
        const entity = storeValue.entities[id as any];
        if (entity != null)
          entities.push(entity);
      }
    }

    return entities;
  }

  private getNewExpirationDate(): Date {
    const now = new Date();
    return new Date(now.getTime() + this.cacheTime);
  }
} 