import { ApiService } from './services/utility/api.service';
import { AuthenticationService } from './services/security/authentication.service';
import { NotificationService } from './services/utility/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NotificationBarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatButtonModule,
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
    UserStore, 
    AuthenticationService, 
    ApiService,
    ApplicationGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
