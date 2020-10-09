import { EditComponentsBase } from './../../components/base/editComponentBase';
import { ApiReply } from './../../models/utility/apiReply';
import { NotificationService } from './../../services/utility/notification.service';
import { LocalizationService } from './../../services/utility/localization.service';
import { ModelServiceBase } from './../../services/modelServiceBase';
import { FinancialItemModel } from "./../../models/finance/financialItem.model";
import { of } from 'rxjs';

class TestComponent extends EditComponentsBase<FinancialItemModel>
{ }

describe('EditComponentBase', () => 
{
  let component: TestComponent;
  let localizationService: LocalizationService = { execute(a: any, b:any) {} } as LocalizationService;
  let notificationService: NotificationService = { 
    notifySuccessMessage(a: string) {}, 
    notifyErrorMessage(a: string) {}
  } as NotificationService;
  let service: ModelServiceBase<FinancialItemModel> = { 
    create(a: any) {},
    update(a: any) {}
  } as ModelServiceBase<FinancialItemModel>;
  let successSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;
  let localizationSpy: jasmine.Spy;

  beforeEach(() => {
    component = new TestComponent(service, localizationService, notificationService);
    successSpy = spyOn(notificationService, "notifySuccessMessage");
    errorSpy = spyOn(notificationService, "notifyErrorMessage");
    localizationSpy = spyOn(localizationService, "execute");
  })

  it("saves new entity successfully", async () => await saveSuccessfulCore("create", true))

  it("saves existing successfully", async () => await saveSuccessfulCore("update", false))

  it("does not save successfully", async () => 
  {
    let model = new FinancialItemModel();
    model.financialItemId = 12;
    model.title = "test"
    let reply = new ApiReply<FinancialItemModel>(null, false, "test-error");
    let spy = spyOn(service, "create").and.returnValue(of(reply));
    (component as any).isNew = true;
    component.entity = model;

    let successful: boolean = await (component as any).saveChanges().toPromise();

    expect(errorSpy).toHaveBeenCalledWith("test-error");
    expect(spy).toHaveBeenCalledWith(model);
    expect(successful).toBe(false);
    expect(component.entity).toBe(model);
  })

  async function saveSuccessfulCore(name: string, isNew: boolean)
  {
    let model = new FinancialItemModel();
    model.financialItemId = 12;
    model.title = "test"
    let replyItem = new FinancialItemModel();
    let reply = new ApiReply<FinancialItemModel>(replyItem, true, null);
    let spy = spyOn<any>(service, name).and.returnValue(of(reply));
    (component as any).isNew = isNew;
    component.entity = model;

    let successful: boolean = await (component as any).saveChanges().toPromise();

    expect(localizationSpy).toHaveBeenCalledWith("FinancialItemModel.SaveMessage", {name: "test"});
    expect(successSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(model);
    expect(successful).toBe(true);
    expect(component.entity).toBe(replyItem);
  }
});
