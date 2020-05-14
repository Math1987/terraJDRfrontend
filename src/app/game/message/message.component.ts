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

  private static messages = [] ;
  private static infos = [] ;

  static init(){

    MessageComponent.messages = [];
    for ( let json of Historic.HISTORIC ){
      let message = Translator.fromHistoricToMessage(Area.character,json, 'fr');
      if ( message ){
        MessageComponent.messages.push(message);
      }
      let info = Translator.fromHistoricToInfos(Area.character, json, 'fr');
      if ( info ){
        MessageComponent.infos.push(info);
      }
    }
    Historic.callBackNewRow = function(json) {

      let bodyMessage = document.getElementById("bodyMessage") as HTMLElement ;
      bodyMessage.scrollTo(0,0);

      let message = Translator.fromHistoricToMessage(Area.character,json, 'fr');
      if ( message ){
        MessageComponent.messages.unshift(message);
      }
      let info = Translator.fromHistoricToInfos(Area.character, json, 'fr');
      if ( info ){
        MessageComponent.infos.unshift(info);
      }
    };

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
    return MessageComponent.infos ;
  }

}
