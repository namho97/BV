import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, Subscription } from 'rxjs'
import { LocalStorageHelper } from '../utilities/local-storage.helper';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private FcmTokenKey = 'FcmTokenKey'
  currentMessage = new BehaviorSubject(null);
  private subscription: Subscription;
  taskCount: number;
  notificationCount: number;

  constructor(
    private angularFireMessaging: AngularFireMessaging) {
    // this.angularFireMessaging.messaging.subscribe(
    //   (_messaging) => {
    //     _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //     _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //   }
    // )
  }

  setFcmToken(token) {
    LocalStorageHelper.setItem(this.FcmTokenKey, token)
  }

  getFcmToken(): String {
    return LocalStorageHelper.getItem<String>(this.FcmTokenKey)
  }

  requestPermission() {
    this.angularFireMessaging.requestPermission.subscribe((token) => {
      console.log('requestPermission ',token);
    },
    (err) => {
      console.error('Unable to get permission to notify.', err);
    });

    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        //console.log(token);
        this.setFcmToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  stopReceiveMessage() {
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
    this.subscription = null;
  }
  receiveMessage() {

    if (this.subscription == null) {
      this.subscription = this.angularFireMessaging.messages.subscribe(
        (payload) => {
          console.log('new message received. ', payload);
            // if(payload != null && payload[0].data.MessagingType == EnumMessagingType.Task)
            // {
            //   console.log('thông báo');
            //   //this.taskCount++;
            // }
            // else if(payload != null && payload[0].data.MessagingType == EnumMessagingType.Notification)
            // {
            //   console.log('công việc');
            //   //this.notificationCount++;
            // }
          this.currentMessage.next(payload);
        })
    }
  }
}
