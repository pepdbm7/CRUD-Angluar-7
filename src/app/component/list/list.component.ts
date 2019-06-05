import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service'

@Component({
  selector: 'listComponent',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


/**
 * List Component
 * 
 * @class ListComponent
 * @classdesc Crates a ListComponent element which contains the logic of deleting and editing a post.
 * @extends Component
 */


export class ListComponent {

  items: any;

  editItem:any = {
    name: ''
  }

  /**
    *Creates an instance of ListAddComponent.
    * @param {Service} ConnectionService to connect this component with DB logic
  */

  constructor(private connection:ConnectionService) {
  this.connection.listItems().subscribe(item => {
    this.items = item;
  })
  }

  delete(item) {
    //we use deleteItem() method we've created in connection service
    this.connection.deleteItem(item)
  }

  //used when showing modal, 
  edit(item) {
    this.editItem = item;
  }

  addEditedItem() {
    //we use editItem() from the service
    this.connection.editItem(this.editItem)
  }

}
