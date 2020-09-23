import { AuthenticationService } from './../../../../services/security/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../models/security/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../style.css']
})
export class LoginComponent extends AuthenticationComponent 
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
      password: ''
    });
  }

  /**
   * @inheritdoc
   */
  protected SubmitCore(param: any): Observable<{ successfull: boolean, message: string }>
  {
    let user: UserModel;
    user.email = param.email;
    user.password = param.password;
    return this.authenticationService.login(user);
  }
}