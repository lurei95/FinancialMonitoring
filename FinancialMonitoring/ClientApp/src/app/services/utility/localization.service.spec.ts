import { LocalizationService } from './localization.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';

describe('LocalizationService', () => 
{
  registerLocaleData(localeDe);
  let service : LocalizationService;
  let translateService: TranslateService 
    = { getBrowserLang() {}, get(a: any, b: any) {} } as TranslateService;
  let spy1: jasmine.Spy;
  let spy2: jasmine.Spy;

  beforeEach(() => 
  {
    spy1 = spyOn(translateService, "getBrowserLang").and.returnValue("de");
    spy2 = spyOn(translateService, "get").and.returnValue(of("result"));
    service = new LocalizationService(translateService);
  })

  it("does return currency symbol", () => expect(service.currncySymbol).toBe("€"))

  it("get localized string on execute", () => 
  {
    expect(service.execute("test1", 1)).toBe("result");
    expect(spy2).toHaveBeenCalledWith("test1", 1);
  })
});
