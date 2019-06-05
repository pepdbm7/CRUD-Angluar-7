import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Application container
 * 
 * @class AppComponent
 * @classdesc Crates a main element to wrap the application. Connects with the AngularFireStore DB
 * @extends {Component}
 */

export class AppComponent {
  items: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }
}
