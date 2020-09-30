import { UserQuery } from "./security/user.query";
import { UserStore } from "./security/user.store";
import { NotificationQuery } from "./utility/notification.query";
import { NotificationStore } from "./utility/notification.store";

/**
 * List of the services of the store for providers
 */
export const storeServices = [
  NotificationQuery,
  NotificationStore, 
  UserQuery, 
  UserStore,
]