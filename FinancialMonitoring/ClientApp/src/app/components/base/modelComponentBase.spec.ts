import { ApiReply } from './../../models/utility/apiReply';
import { NotificationService } from './../../services/utility/notification.service';
import { LocalizationService } from './../../services/utility/localization.service';
import { ModelServiceBase } from './../../services/modelServiceBase';
import { FinancialItemModel } from "./../../models/finance/financialItem.model";
import { ModelComponentBase } from "./modelComponentBase";
import { of } from 'rxjs';

class TestComponent extends ModelComponentBase<FinancialItemModel>
{ }

describe('ModelComponentBase', () => 
{
  let component: TestComponent;
  let localizationService: LocalizationService = { execute(a: any, b:any) {} } as LocalizationService;
  let notificationService: NotificationService = { 
    notifySuccessMessage(a: string) {}, 
    notifyErrorMessage(a: string) {}
  } as NotificationService;
  let service: ModelServiceBase<FinancialItemModel> 
    = { delete(a: any) {} } as ModelServiceBase<FinancialItemModel>;
  let successSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let localizationSpy: jasmine.Spy;

  beforeEach(() => {
    component = new TestComponent(service, localizationService, notificationService);
    successSpy = spyOn(notificationService, "notifySuccessMessage");
    errorSpy = spyOn(notificationService, "notifyErrorMessage");
    localizationSpy = spyOn(localizationService, "execute");
  })

  it("deletes successfully", async () => 
  {
    let model = new FinancialItemModel();
    model.financialItemId = 12;
    model.title = "test"
    let reply = new ApiReply<any>(null, true, null);
    let spy = spyOn(service, "delete").and.returnValue(of(reply));

    let successful: boolean = await (component as any).delete(model).toPromise();

    expect(localizationSpy).toHaveBeenCalledWith("FinancialItemModel.DeleteMessage", {name: "test"});
    expect(successSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(12);
    expect(successful).toBe(true);
  })

  it("does not delete successfully", async () => 
  {
    let model = new FinancialItemModel();
    model.financialItemId = 12;
    let reply = new ApiReply<any>(null, false, "test-error");
    let spy = spyOn(service, "delete").and.returnValue(of(reply));

    let successful: boolean = await (component as any).delete(model).toPromise();

    expect(errorSpy).toHaveBeenCalledWith("test-error");
    expect(spy).toHaveBeenCalledWith(12);
    expect(successful).toBe(false);
  })
});
