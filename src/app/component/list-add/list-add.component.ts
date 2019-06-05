import { Component } from '@angular/core';
import { ConnectionService } from '../../services/connection.service'

@Component({
  selector: 'listAddCompnent',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.scss']
})

/**
 * List Add Component
 * 
 * @class ListAddComponent
 * @classdesc Crates a ListAddComponent element which contains the logic of creating a post.
 * @extends Component
 */


export class ListAddComponent {

  item:any = {
    name: ''
  }

   /**
     *Creates an instance of ListAddComponent.
     * @param {Service} ConnectionService to connect this component with DB logic
    */

  constructor(private service:ConnectionService) { }


  //create a new post:
  addNew() {
    this.service.addItem(this.item);

    //to empty the input:
    this.item.name = ''
  }

}
