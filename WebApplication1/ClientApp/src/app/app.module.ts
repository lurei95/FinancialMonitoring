import { ApiService } from './services/utility/api.service';
import { AuthenticationService } from './services/security/authentication.service';
import { NotificationService } from './services/utility/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    NotificationBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, canActivate: [ApplicationGuard] },
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
