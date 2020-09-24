import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
   * Constructor
   * 
   * @param {FormBuilder} formBuilder Injected: FormBuilder
   * @param {AuthenticationService} authenticationService Injected: AuthenticationService
   * @param {Router} router Injected: Router
   */
  constructor(private formBuilder: FormBuilder, authenticationService: AuthenticationService, router: Router) 
  {
    super(authenticationService, router);
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  /**
   * @inheritdoc
   */
  protected SubmitCore(param: any): Observable<ApiReply<UserModel>> 
  {
    let user: UserModel;
    user.email = param.email;
    user.password = param.password;
    return this.authenticationService.login(user);
  }
}