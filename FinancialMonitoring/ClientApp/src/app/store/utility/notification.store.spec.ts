import { NotificationStore } from './notification.store';

describe('NotificationStore', () => 
{
  let store: NotificationStore;

  beforeEach(() => store = new NotificationStore())

  it("selects correct initial state", () => expect(store.getValue().notification).toBeNull())
});