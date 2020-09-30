import { FinancialItemService } from "./finance/financialItem.service";
import { ApplicationGuard } from "./security/applicationGuard";
import { AuthenticationService } from "./security/authentication.service";
import { LoginGuard } from "./security/loginGuard";
import { ApiService } from "./utility/api.service";
import { MessageDialogService } from "./utility/messageDialog.service";
import { NotificationService } from "./utility/notification.service";

/**
 * List of the services for providers
 */
export const services = [
  NotificationService,
  FinancialItemService,
  AuthenticationService, 
  ApiService,
  ApplicationGuard,
  LoginGuard,
  MessageDialogService
]