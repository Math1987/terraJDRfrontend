import { Component, OnInit } from '@angular/core';
import {Net} from '../../services/net';
import {Translator} from '../../services/world/model/translator/translator';
import {Area} from '../../services/world/area';
import {environment} from '../../../environments/environment';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  static messages = [] ;

  static init(){
    if ( Area.world && Area.character ) {

      MessageComponent.messages = [] ;
      Net.http.get(`${environment.backURL}/readHistoricById?world=${Area.world.name}&id=${Area.character.id}`).subscribe((res)=>{

        console.log(res);

        for ( let i = res.length-1 ; i >= 0 ; i -- ){
          let message = Translator.fromHistoricToMessage(res[i].key, res[i], 'fr')  ;
          console.log(res[i].key);
          if ( message ){
            MessageComponent.messages.unshift(message);
          }
          if ( MessageComponent.messages.length > 10 ){
            break ;
          }
        }

      });
    }
    const self = this ;
    Net.socket.on('historic', function(json) {
      console.log(json);
      let message = Translator.fromHistoricToMessage(Area.character, json, 'fr') ;
      if ( message ){
        MessageComponent.messages.unshift(message);
      }
    });

  }

  constructor() {

  }

  ngOnInit() {



  }

  update(){

  }
  getMessages(){
    return MessageComponent.messages ;
  }

}
