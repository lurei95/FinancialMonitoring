import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";

/**
 * Guard that secures that nobody can navigate to the login pages if they are already logged in
 */
@Injectable()
export class LoginGuard implements CanActivate 
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
   * Tests if the user can navigate to login pages
   * 
   * @returns {Promise<any>} True if user is not logged in and redirect to home page otherwise
   * @param {AuthenticationService} authenticationService Injected: service for handling authentication matters
   */
  canActivate(): Promise<boolean | UrlTree>
  {
    return this.authenticationService.accessToken$.pipe(map(token => 
    {
      if (token)
        return true;
      else 
        return this.router.parseUrl('/home');
    })).toPromise();
  }
} 