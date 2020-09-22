import { AuthenticationService } from './services/security/authentication.service';
import { NotificationService } from './services/utility/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { NotificationBarComponent } from './components/utility/notification-bar/notification-bar.component';
import { NotificationQuery } from './store/utility/notification.query';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationStore } from './store/utility/notification.store';
import { UserQuery } from './store/security/user.query';
import { UserStore } from './store/security/user.store';

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
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
  ],
  providers: [NotificationService, NotificationQuery, NotificationStore, UserQuery, UserStore, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
