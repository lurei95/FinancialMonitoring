import { environment } from './../../../environments/environment';
import { FinancialItemModel } from './../../models/finance/financialItem.model';
import { ApiReply } from './../../models/utility/apiReply';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('ApiService', () => 
{
  let service : ApiService;
  let httpClient: HttpClient = {
    get(a: any, b: any) {},
    delete(a: any, b: any) {},
    put(a: any, b: any, c: any) {},
    post(a: any, b: any, c: any) {}
  } as HttpClient;

  beforeEach(() => 
  {
    service = new ApiService(httpClient);
  })

  describe("api-methods", () => {

    it("get test", () => 
    { 
      apiTestCore("get", null, 
        (path: any, type: any, headers: any) => service.get(path, type, headers)); 
    })

    it("delete test", () => 
    { 
      apiTestCore("delete", null, 
        (path: any, type: any, headers: any) => service.delete(path, type, headers)); 
    })

    it("put test", () => 
    { 
      apiTestCore("put", "test", 
        (path: any, param: any, type: any, headers: any) => service.put(path, param, type, headers)); 
    })

    it("post test", () => 
    { 
      apiTestCore("post", "test", 
        (path: any, param: any, type: any, headers: any) => service.post(path, param, type, headers)); 
    })

    function apiTestCore(methodName: string, param: any, methodCall: any)
    {
      let headers: HttpHeaders = {} as HttpHeaders;
      let callbackCalled: boolean = false;
      let reply: ApiReply<any> = new ApiReply(null, true, null);
      let spy1 = spyOn<any>(httpClient, methodName).and.returnValue(of(null));
      let spy2 = spyOn<any>(service, "handleReply").and.returnValue(reply);
      
      if (param)
      {
        methodCall("path", param, FinancialItemModel, headers).subscribe(result => 
        {
          expect(result).toMatchObject(reply);
          callbackCalled = true;
        });
        expect(spy1).toHaveBeenCalledWith(environment.apiEndpoint + "path", param, 
        { observe: 'response', headers: headers });
      }
      else
      {
        methodCall("path", FinancialItemModel, headers).subscribe(result => 
        {
          expect(result).toMatchObject(reply);
          callbackCalled = true;
        });
        expect(spy1).toHaveBeenCalledWith(environment.apiEndpoint + "path", 
        { observe: 'response', headers: headers });
      }
  
      expect(spy2).toHaveBeenCalledWith(null, FinancialItemModel);
      expect(callbackCalled).toBe(true);
    }  
  })

  describe("handleReply", () => {

    it("handles internal server error", () => 
    {
      let response: HttpResponse<Object> = new HttpResponse<Object>({ body: "test-error", status: 500 });
      
      let reply: ApiReply<any> = (service as any).handleReply(response, FinancialItemModel);

      expect(reply.successful).toBe(false);
      expect(reply.result).toBeNull();
      expect(reply.message).toBe("test-error");
    })

    it("handles generic error", () => 
    {
      let response: HttpResponse<Object> = new HttpResponse<Object>({ body: "test-error", status: 404 });
      let errorCatched: boolean = false;

      try
      {
        let reply: ApiReply<any> = (service as any).handleReply(response, FinancialItemModel);
      }
      catch(error)
      {
        expect(error.message).toBe("test-error");
        errorCatched = true;
      }

      expect(errorCatched).toBe(true);
    })

    it("handles successful response", () => 
    {
      let model: FinancialItemModel = new FinancialItemModel();
      model.title = "test";
      let response: HttpResponse<Object> = new HttpResponse<Object>({ body: model, status: 200 });
      
      let reply: ApiReply<any> = (service as any).handleReply(response, FinancialItemModel);

      expect(reply.successful).toBe(true);
      expect(reply.result).toMatchObject(model);
      expect(reply.message).toBeNull();
    })
  })
});
