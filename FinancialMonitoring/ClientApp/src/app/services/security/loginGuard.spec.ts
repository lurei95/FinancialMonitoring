import { LoginGuard } from './loginGuard';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router, UrlTree } from '@angular/router';
import { of } from 'rxjs';

describe('LoginGuard', () => 
{
  let guard : LoginGuard;
  let router: Router = { parseUrl(url: string) { return null }} as Router;
  let authenticationService: AuthenticationService 
    = { getAccessToken(): Observable<string> { return of(null) } } as AuthenticationService;

  beforeEach(() => 
  { guard = new LoginGuard(router, authenticationService); })

  it("cannot activate with valid access token", async () => 
  { 
    let spy = spyOn(authenticationService, "getAccessToken").and.returnValue(of("test-token"));
    let url = new UrlTree();
    spyOn(router, "parseUrl").and.returnValue(url);

    let result = await guard.canActivate();

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(url);
  })

  it("can activate with no access token", async () => 
  { 
    let spy = spyOn(authenticationService, "getAccessToken").and.returnValue(of(null));

    let result = await guard.canActivate();

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(true);
  })
});