import { Component, OnInit } from '@angular/core';
import {Net} from '../../services/net';
import {Translator} from '../../services/world/model/translator/translator';
import {Area} from '../../services/world/area';
import {environment} from '../../../environments/environment';
import {NavComponent} from '../../nav/nav.component';
import {Historic} from '../../services/historic';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  static messages = [] ;
  static infos = [] ;

  static init(){

    MessageComponent.messages = [];
    for ( let json of Historic.HISTORIC ){
      let message = Translator.fromHistoricToMessage(Area.character,json, 'fr');
      if ( message ){
        MessageComponent.messages.push(message);
      }
    }
    Historic.callBackNewRow = function(json) {

      let message = Translator.fromHistoricToMessage(Area.character,json, 'fr');
      if ( message ){
        MessageComponent.messages.unshift(message);
      }
    };

    console.log(Historic.HISTORIC);

  }
  static check(){
    if ( MessageComponent.messages.length <= 0 && Historic.HISTORIC.length > 0 ){
      MessageComponent.init();
    }
  }

  constructor() {
    MessageComponent.init();
  }

  ngOnInit() {



  }

  update(){



  }
  getMessages(){
    return MessageComponent.messages ;
  }

}
