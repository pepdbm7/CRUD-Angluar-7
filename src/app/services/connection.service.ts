import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; //we need it to use map in the observable, when getting the id of each item


/**
 * Interface Item
 * 
 * @interface Item
 * @interfacedesc Crates a contract that defines the collection data model
 */

export interface Item { name: string; }



/**
 * Connection Service
 * 
 * @class App
 * @classdesc Crates a service which contains the logic to manage Firebase DB.
 */

@Injectable()
export class ConnectionService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {

    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe( // method to get each item's Id
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listItems() {
    return this.items;
  }

  //create new posts and add them into DB:
  addItem(item: Item) {
    this.itemsCollection.add(item)
  }

  //delete a selected post:
  deleteItem(item) {
    //we take item by id (FireStore's way):
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`)
    this.itemDoc.delete()
  }

  //edit a selected post:
  editItem(item) {
     //we take item by id (FireStore's way):
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`)
    this.itemDoc.update(item)
  }
}
