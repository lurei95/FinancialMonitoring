import { ApiReply } from './../../../models/utility/apiReply';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './../../../services/security/authentication.service';
import { FormControl, FormGroup} from '@angular/forms';
import { UserModel } from 'src/app/models/security/user.model';

/**
 * Baseclass for an authentication component
 */
export abstract class AuthenticationComponent 
{
  private _apiError: string;

  protected _isAuthenticating: boolean
  /**
   * @returns {boolean} Whether the authentication is processed
   */
  protected get isAuthenticating(): boolean { return this._isAuthenticating; } 

  /**
   * @returns {FormControl} Email input
   */
  protected get email(): FormControl { return this.form.get('email') as FormControl; }

  /**
   * @returns {FormControl} password input
   */
  protected get password(): FormControl  { return this.form.get('password') as FormControl; }

  /**
   * @returns {FormControl} The error
   */
  protected get error(): string 
  {
    if (this._apiError)
      return this._apiError;
    if (this.email.errors)
    {
      if (this.email.errors.required)
        return "Email is required.";
      if (this.email.errors.email)
        return "Email needs to be a valid email.";
    }  
    if (this.password.errors && this.password.errors.required)
      return "Password is required.";
  }

  /**
   * @returns {boolean} If email has an error
   */
  protected get hasEmailError(): boolean 
  { return this.email.invalid && (this.email.dirty || this.email.touched); }

  /**
   * @returns {boolean} If password has an error
   */
  protected get hasPasswordError(): boolean 
  { return this.password.invalid && (this.password.dirty || this.password.touched) }

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
    this._isAuthenticating = true;
    this.submitCore(formData).subscribe(result => 
    {
      this.validateAllFormFields(this.form);
      if (result.successful)
        this.router.navigateByUrl("/home");
      else
        this._apiError = result.message;
      this._isAuthenticating = false;
    })
  }

  /**
   * The authentication action performed on submit
   * 
   * @param {any} formData The form data
   * @returns {Observable<ApiReply<UserModel>>} The authentication result
   */
  protected abstract submitCore(param: any): Observable<ApiReply<UserModel>>

  private validateAllFormFields(formGroup: FormGroup) 
  {      
    Object.keys(formGroup.controls).forEach(field => 
    { 
      const control = formGroup.get(field);     
      if (control instanceof FormControl)
        control.markAsTouched({ onlySelf: true });
      else if (control instanceof FormGroup)
        this.validateAllFormFields(control); 
    });
  }
}