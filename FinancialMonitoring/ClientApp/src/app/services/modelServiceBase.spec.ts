import { services } from './services';
import { ApiReply } from 'src/app/models/utility/apiReply';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './security/authentication.service';
import { ApiService } from './utility/api.service';
import { FinancialItemModel } from "../models/finance/financialItem.model";
import { ModelServiceBase } from "./modelServiceBase";
import { Observable, of, Subject } from 'rxjs';

class TestService extends ModelServiceBase<FinancialItemModel>
{
  protected get path(): string { return "path"; }

  protected get type(): new () => FinancialItemModel { return FinancialItemModel; }
}

describe('ModelServiceBase', () => 
{
  let service : TestService;
  let apiService: ApiService = 
  { 
    get(a: any, b: any, c: any) {},
    delete(a: any, b: any, c: any) {},
    put(a: any, b: any, c: any, d: any) {},
    post(a: any, b: any, c: any, d: any) {}
  } as ApiService;
  let authenticationService: AuthenticationService = { getAccessToken() { return of("test")} } as AuthenticationService;

  beforeEach(() => {
    service = new TestService(apiService, authenticationService);
  })

  it("create", () => 
  {
    let parameter = new FinancialItemModel();
    testCore("post", parameter, (param: FinancialItemModel) => service.create(param), "path", FinancialItemModel);
  })

  it("update", () => 
  {
    let parameter = new FinancialItemModel();
    testCore("put", parameter, (param: FinancialItemModel) => service.update(param), "path", FinancialItemModel);
  })

  it("delete", () => testCore("delete", null, () => service.delete("test"), "path/test", FinancialItemModel))

  it("get", () => testCore("get", null, () => service.get("test"), "path/test", FinancialItemModel))

  it("retrieve", () => testCore("get", null, () => service.retrieve(), "path", Array))

  function testCore(name: string, param: any, methodCall: any, path: string, type: any)
  {
    let spy1 = spyOn<any>(apiService, name);
    let spy2 = spyOn<any>(service, "withAuthentication").and.callFake(parm => parm(null));

    if (param)
    {
      methodCall(param);     
      expect(spy2).toBeCalled();
      expect(spy1).toHaveBeenCalledWith(path, param, type, null)
    }
    else
    {
      methodCall();
      expect(spy2).toBeCalled();
      expect(spy1).toHaveBeenCalledWith(path, type, null)
    }
  }
});