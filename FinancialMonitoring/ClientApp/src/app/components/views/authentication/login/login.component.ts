import { MessageDialogService } from './../../../../services/utility/messageDialog.service';
import { AuthenticationService } from './../../../../services/security/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationComponent } from '../authentication.component';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../models/security/user.model';
import { ApiReply } from 'src/app/models/utility/apiReply';
import { EditDialogContentComponent } from 'src/app/components/utility/edit-dialog-content/edit-dialog-content.component';
import { MatDialog } from '@angular/material/dialog/';
import { DialogResult } from 'src/app/components/utility/message-dialog/dialogResult';
import { FinancialItemEditDialogComponent } from '../../finance/financial-item-edit-dialog/financial-item-edit-dialog.component';
import { FinancialItemModel } from 'src/app/models/finance/financialItem.model';

/**
 * Login Dialog
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../style.css']
})
export class LoginComponent extends AuthenticationComponent implements OnInit
{
  /**
   * Constructor
   * 
   * @param {AuthenticationService} authenticationService Injected: AuthenticationService
   * @param {Router} router Injected: Router
   */
  constructor(authenticationService: AuthenticationService, router: Router, private s: MatDialog) 
  {
    super(authenticationService, router);
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {

    this.s.open(FinancialItemEditDialogComponent, {
      panelClass: 'fullscreenDialog',
      data: new FinancialItemModel(),
      disableClose: true
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