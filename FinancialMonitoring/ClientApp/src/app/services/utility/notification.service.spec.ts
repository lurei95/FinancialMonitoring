import { NotificationStore } from './../../store/utility/notification.store';
import { NotificationService } from './notification.service';
import { NotificationModel } from './../../models/utility/notification.model';
import { NotificationKind } from './../../models/utility/notificationKind';

describe('NotificationService', () => 
{
  let service : NotificationService;
  let store: NotificationStore = { update(param : any) {} } as NotificationStore;
  let spy: jasmine.Spy;

  beforeEach(() => 
  {
    console.log("test")
    spy = spyOn(store, "update");
    service = new NotificationService(store);
    (service as any).timeout = 20;
  })

  it("does update store with current notification", async () => 
  {
    let parameter = { notification: new NotificationModel("test", NotificationKind.ErrorNotification) };

    service.notifyErrorMessage("test");
    await new Promise((r) => setTimeout(r, 30));

    expect(spy).toHaveBeenNthCalledWith(1, parameter);
    expect(spy).toHaveBeenNthCalledWith(2, { notification: null });
  })

  it("does show error notification", () => 
  {
    service.notifyErrorMessage("test");
    notificationTestCore(NotificationKind.ErrorNotification);
  })

  it("does show information notification", () => 
  {
    service.notifyInformationMessage("test");
    notificationTestCore(NotificationKind.InformationNotification);
  })

  it("does show success notification", () => 
  {
    service.notifySuccessMessage("test");
    notificationTestCore(NotificationKind.SuccessNotification);
  })

  it("does show warning notification", () => 
  {
    service.notifyWarningMessage("test");
    notificationTestCore(NotificationKind.WarningNotification);
  })

  function notificationTestCore(kind: NotificationKind) 
  {
    let parameter = { notification: new NotificationModel("test", kind) };

    service.notifyErrorMessage("test");

    expect(spy).toHaveBeenNthCalledWith(1, parameter);
  }
});
