import { AuthenticationService } from './../../../../services/security/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../models/security/user.model';
import { ApiReply } from 'src/app/models/utility/apiReply';

/**
 * Login Dialog
 */
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
   * @param {AuthenticationService} authenticationService Injected: AuthenticationService
   * @param {Router} router Injected: Router
   */
  constructor(authenticationService: AuthenticationService, router: Router) 
  {
    super(authenticationService, router);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  /**
   * @inheritdoc
   */
  protected submitCore(param: any): Observable<ApiReply<UserModel>>
  {
    let user: UserModel = new UserModel();
    user.email = param.email;
    user.password = param.password;
    return this.authenticationService.login(user);
  }
}