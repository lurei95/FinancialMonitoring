import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";

/**
 * Guard that secures that nobody can navigate to the application without being logged in
 */
@Injectable()
export class ApplicationGuard implements CanActivate 
{
  /**
   * Constructor
   * 
   * @param {Router} router Injected: Router for routing
   * @param {AuthenticationService} authenticationService Injected: service for handling authentication matters
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) 
  { }

  /**
   * Tests if the user can navigate to main application routes
   * 
   * @returns {Promise<any>} True if user logged in and redirect to login page otherwise
   */
  canActivate(): Promise<boolean | UrlTree>
  {
    return this.authenticationService.getAccessToken().pipe(map(token => 
    {
      if (token)
        return true;
      else 
        return this.router.parseUrl('/login');
    })).toPromise();
  }
}