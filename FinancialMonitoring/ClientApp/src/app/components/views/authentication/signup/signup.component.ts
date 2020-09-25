import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../models/security/user.model';
import { ApiReply } from 'src/app/models/utility/apiReply';

/**
 * Component for singup dialog
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../style.css']
})
export class SignupComponent extends AuthenticationComponent
{
  /**
   * @inheritdoc
   */
  protected get error(): string 
  {
    if (super.error)
      return super.error;
    if (this.email.errors && this.confirmPassword.errors.required)
      return "Email is required."; 
    if (this.form.errors && this.form.errors.confirmPassword)
      return "The confirm password needs to match the password.";
  }

  private get hasConfirmPasswordError(): boolean 
  { return this.form.invalid; }

  /**
   * @returns {FormControl} password input
   */
  protected get confirmPassword(): FormControl  { return this.form.get('confirmPassword') as FormControl; }

  /**
   * Constructor
   * 
   * @param {AuthenticationService} authenticationService Injected: AuthenticationService
   * @param {Router} router Injected: Router
   */
  constructor(authenticationService: AuthenticationService, router: Router) 
  {
    super(authenticationService, router);
    this.form = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.confirmPasswordValidator])
    }, 
    {
      validators: [this.confirmPasswordValidator()],
      updateOn: 'blur',
    });
    this.confirmPasswordValidator.bind(this)
  }

  /**
   * @inheritdoc
   */
  protected submitCore(param: any): Observable<ApiReply<UserModel>> 
  {
    let user: UserModel = new UserModel();
    user.email = param.email;
    user.password = param.password;
    return this.authenticationService.signup(user);
  }

  private confirmPasswordValidator() : ValidatorFn 
  {
    return (formGroup: FormGroup) => 
    {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');

      if (password.value != confirmPassword.value)
        return { confirmPassword: true }; 
    };
  }
}