import { NotificationService } from './../../../services/utility/notificationService';
import { NotificationModel } from './../../../models/utility/notification.model';
import { Component, OnInit } from '@angular/core';
import { NotificationKind } from '../../../models/utility/notificationKind';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { NotificationQuery } from '../../../store/utility/notification.query';

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
  private class: string;

  private visible: boolean;

  private message: string;

  /**
   * Constructor
   * 
   * @param {NotificationQuery} query Injected: Query for @see NotificationModel related state
   * @param {NotificationQuery} service Injected: service for displaying notifications
   */
  constructor(private query: NotificationQuery, private service: NotificationService) { }

  /**
   * @inheritdoc
   */
  ngOnInit() 
  {
    this.query.selectNotification$.subscribe((notification) => 
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
        this.class = "alert alert-success bottomBar";
        this.visible = true;
        break;
      case NotificationKind.InformationNotification:
        this.class = "alert alert-info bottomBar";
        this.visible = true;
        break;
      case NotificationKind.WarningNotification:
        this.class = "alert alert-warning bottomBar";
        this.visible = true;
        break;
      case NotificationKind.ErrorNotification:
        this.class = "alert alert-danger bottomBar";
        this.visible = true;
        break;
      default:
        this.resetNotification();
        break;
    }
  }

  private dismissNotification() { this.service.dismissNotification(); }

  private resetNotification()
  {
    if (this.visible)
    {
      this.visible = false;
      this.class = null;
      this.message = null;
    }
  }
}