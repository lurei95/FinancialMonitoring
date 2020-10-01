import { AppComponent } from "../app.component";
import { CheckEditComponent } from "./controls/check-edit/check-edit.component";
import { ComboEditComponent } from "./controls/combo-edit/combo-edit.component";
import { DateEditComponent } from "./controls/date-edit/date-edit.component";
import { ErrorNotificationComponent } from "./controls/error-notification/error-notification.component";
import { TextEditComponent } from "./controls/text-edit/text-edit.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { EditDialogContentComponent } from "./utility/edit-dialog-content/edit-dialog-content.component";
import { MessageDialogComponent } from "./utility/message-dialog/message-dialog.component";
import { NotificationBarComponent } from "./utility/notification-bar/notification-bar.component";
import { WaitSpinnerComponent } from "./utility/wait-spinner/wait-spinner.component";
import { LoginComponent } from "./views/authentication/login/login.component";
import { SignupComponent } from "./views/authentication/signup/signup.component";
import { FinancialItemEditDialogComponent } from "./views/finance/financial-item-edit-dialog/financial-item-edit-dialog.component";
import { HomeComponent } from "./views/home/home.component";

/**
 * List of the components
 */
export const components = [
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
  CheckEditComponent,
  ErrorNotificationComponent
]

/**
 * List of the entry components
 */
export const entryComponents = [
  MessageDialogComponent,
  FinancialItemEditDialogComponent
]