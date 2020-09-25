import { ApiReply } from './../../../models/utility/apiReply';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../../services/security/authentication.service';
import { FormGroup} from '@angular/forms';
import { UserModel } from 'src/app/models/security/user.model';

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
  public onSubmit(formData: any) 
  {
    this.submitCore(formData).subscribe(result => 
    {
      if (result.successful)
        this.router.navigateByUrl("/home");
      else
        this._error = result.message;
    })
  }

  /**
   * The authentication action performed on submit
   * 
   * @param {any} formData The form data
   * @returns {Observable<ApiReply<UserModel>>} The authentication result
   */
  protected abstract submitCore(param: any): Observable<ApiReply<UserModel>>
}