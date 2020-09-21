import { NotificationModel } from './../../../models/utility/notification.model';
import { Component, OnInit } from '@angular/core';
import { NotificationKind } from '../../../models/utility/notificationKind';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { NotificationQuery } from '../../../store/notification.query';

/**
 * Component for a notification bar
 */
@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':leave', animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class NotificationBarComponent implements OnInit
{
  private alertClass: string;

  private alertVisible: boolean;

  private message: string;

  /**
   * Constructor
   * 
   * @param {NotificationQuery} notificationQuery Injected: Query for @see NotificationModel related state
   */
  constructor(private notificationQuery: NotificationQuery) { }

  /**
   * @inheritdoc
   */
  ngOnInit() 
  {
    this.notificationQuery.selectNotification$.subscribe((notification) => 
    {
      if (notification)
        this.notifyMessage(notification);
      else
        this.resetNotification();
    });
  }

  private notifyMessage(notification: NotificationModel)
  {
    this.message = notification.message;
    switch (notification.notificationKind)
    {
      case NotificationKind.SuccessNotification:
        this.alertClass = "alert alert-success bottomBar";
        this.alertVisible = true;
        break;
      case NotificationKind.InformationNotification:
        this.alertClass = "alert alert-info bottomBar";
        this.alertVisible = true;
        break;
      case NotificationKind.WarningNotification:
        this.alertClass = "alert alert-warning bottomBar";
        this.alertVisible = true;
        break;
      case NotificationKind.ErrorNotification:
        this.alertClass = "alert alert-danger bottomBar";
        this.alertVisible = true;
        break;
      default:
        this.resetNotification();
        break;
     }
  }

  private resetNotification()
  {
    if (this.alertVisible)
    {
      this.alertVisible = false;
      this.alertClass = null;
      this.message = null;
    }
  }
}