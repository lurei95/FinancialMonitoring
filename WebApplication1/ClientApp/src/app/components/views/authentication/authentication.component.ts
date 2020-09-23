import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../../services/security/authentication.service';
import { FormGroup} from '@angular/forms';

/**
 * Baseclass for an authentication component
 */
export abstract class AuthenticationComponent 
{
  private _error: string;
  /**
   * @returns The errror
   */
  get error(): string { return this._error; }

  /**
   * The FormGroup for the authentication form
   */
  protected form: FormGroup

  /**
   * Constructor
   * 
   * @param {AuthenticationService} authenticationService Injected: AuthenticationService
   * @param {Router} router Injected: Router
   */
  constructor(protected authenticationService: AuthenticationService, private router: Router) 
  { }

  /**
   * Submits the authentication form
   * 
   * @param {any} formData The form data
   */
  public OnSubmit(formData: any) 
  {
    this.SubmitCore(formData).subscribe(result => 
    {
      if (result.successfull)
        this.router.navigateByUrl("/home");
      else
        this._error = result.message;
    })
  }

  /**
   * The authentication action performed on submit
   * 
   * @param {any} formData The form data
   * @returns {Observable<{ successfull: boolean, message: string }>} The authentication result
   */
  protected abstract SubmitCore(param: any): Observable<{ successfull: boolean, message: string }>
}