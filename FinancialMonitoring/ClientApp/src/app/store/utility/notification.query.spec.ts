import { NotificationKind } from './../../models/utility/notificationKind';
import { NotificationStore } from './notification.store';
import { NotificationQuery } from './notification.query';
import { NotificationModel } from './../../models/utility/notification.model';

describe('NotificationQuery', () => 
{
  let query: NotificationQuery;
  let store: NotificationStore = new NotificationStore();

  beforeEach(() => query = new NotificationQuery(store))

  it("selects notification", () => 
  { 
    let wasExecuted: boolean = false;
    let notification: NotificationModel = new NotificationModel("test", NotificationKind.ErrorNotification);
    store.update({notification: notification});

    query.selectNotification$.subscribe(n => 
    {
      expect(n).toBe(notification);
      wasExecuted = true;
    });
    expect(wasExecuted).toBe(true);
  })
});