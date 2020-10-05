import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router, UrlTree } from '@angular/router';
import { ApplicationGuard } from './applicationGuard';
import { of } from 'rxjs';

describe('ApplicationGuard', () => 
{
  let guard : ApplicationGuard;
  let router: Router = { parseUrl(url: string) { return null }} as Router;
  let authenticationService: AuthenticationService 
    = { getAccessToken(): Observable<string> { return of(null) } } as AuthenticationService;

  beforeEach(() => 
  { guard = new ApplicationGuard(router, authenticationService); })

  it("can activate with valid access token", async () => 
  { 
    let spy = spyOn(authenticationService, "getAccessToken").and.returnValue(of("test-token"))

    let result = await guard.canActivate();

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(true);
  })

  it("cannot activate with no access token", async () => 
  { 
    let spy = spyOn(authenticationService, "getAccessToken").and.returnValue(of(null));
    let url = new UrlTree();
    spyOn(router, "parseUrl").and.returnValue(url);

    let result = await guard.canActivate();

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(url);
  })
});