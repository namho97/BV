import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BroadcastService {
  // observable: Observable<any>;
  // observer: Observer<any>;
  subject:Subject<any>;

  constructor() {
    // this.observable = Observable.create((observer: Observer<any>) => {
    //   this.observer = observer;
    // }).pipe(share());
    this.subject = new Subject<any>();
  }

  broadcast(event) {
    //this.observer.next(event);
    this.subject.next(event);
  }
  on(eventName, callback) {
    //this.observable
    //console.log("broadcastService on = ",eventName, callback);
    return this.subject.asObservable()
      .pipe(
        filter((event) => {
          return event!=undefined && event.name === eventName;
        })
      )
      .subscribe(callback);
  }
}
