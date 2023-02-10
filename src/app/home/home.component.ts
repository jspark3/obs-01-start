import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs'

//Observables are not available in ts or js, but is a part of rxjx 
//Build my own Observable
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  
  constructor() { }

  ngOnInit() {
    //interval will fier an event ever few seconds mentioned
    // this. firstObsSubscription = interval(1000).subscribe(count => {
    //     console.log(count)
    //   });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count == 2)
        {
          observer.complete();
        }
        //lets fake an error
        if(count > 3){
          observer.error(new Error('Count is grater 3!'))
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed');
      alert("Completed");
    })
  }

  //An observable does not nessisarally stop when you exit it.
  //The default angular application's observable does it for you
  //Don't forget a ngOnDestroy after you declare your observable
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
