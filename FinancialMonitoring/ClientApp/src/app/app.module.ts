import { MessageDialogService } from './services/utility/messageDialog.service';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './services/utility/api.service';
import { AuthenticationService } from './services/security/authentication.service';
import { NotificationService } from './services/utility/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { NotificationBarComponent } from './components/utility/notification-bar/notification-bar.component';
import { NotificationQuery } from './store/utility/notification.query';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationStore } from './store/utility/notification.store';
import { UserQuery } from './store/security/user.query';
import { UserStore } from './store/security/user.store';
import { HomeComponent } from './components/views/home/home.component';
import { LoginGuard } from './services/security/loginGuard';
import { ApplicationGuard } from './services/security/applicationGuard';
import { LoginComponent } from './components/views/authentication/login/login.component';
import { SignupComponent } from './components/views/authentication/signup/signup.component';
import { WaitSpinnerComponent } from './components/utility/wait-spinner/wait-spinner.component';
import { EditDialogContentComponent } from './components/utility/edit-dialog-content/edit-dialog-content.component';
import { MessageDialogComponent } from './components/utility/message-dialog/message-dialog.component';
import { MatDatepickerModule, MatDialog, MatDialogModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateFactory } from './translation/translation';
import { FinancialItemEditDialogComponent } from './components/views/finance/financial-item-edit-dialog/financial-item-edit-dialog.component';
import { FinancialItemService } from './services/finance/financialItem.service';
import { TextEditComponent } from './components/controls/text-edit/text-edit.component';
import { ComboEditComponent } from './components/controls/combo-edit/combo-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DateEditComponent } from './components/controls/date-edit/date-edit.component';
import { NgxMaskModule } from 'ngx-mask';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { CheckEditComponent } from './components/controls/check-edit/check-edit.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    TextEditComponent,
    FinancialItemEditDialogComponent,
    NavMenuComponent,
    HomeComponent,
    NotificationBarComponent,
    LoginComponent,
    SignupComponent,
    WaitSpinnerComponent,
    EditDialogContentComponent,
    MessageDialogComponent,
    FinancialItemEditDialogComponent,
    TextEditComponent,
    ComboEditComponent,
    DateEditComponent,
    CheckEditComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [ApplicationGuard] },
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'signup', component: SignupComponent, canActivate: [LoginGuard] },
      { path: '**', redirectTo: '/home', pathMatch: 'full' },
    ]),
  ],
  providers: [
    NotificationService, 
    NotificationQuery,
    NotificationStore, 
    UserQuery,
    MatDialog,
    UserStore,
    FinancialItemService,
    AuthenticationService, 
    ApiService,
    ApplicationGuard,
    LoginGuard,
    MessageDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MessageDialogComponent,
    FinancialItemEditDialogComponent
  ],
})
export class AppModule { }