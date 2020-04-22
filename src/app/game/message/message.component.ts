import { Component, OnInit } from '@angular/core';
import {Net} from '../../services/net';
import {Translator} from '../../services/world/model/translator/translator';
import {Area} from '../../services/world/area';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages = [] ;

  constructor() {

  }

  ngOnInit() {

    const self = this ;
    Net.socket.on('historic', function(json) {
      console.log(json);
      let message = Translator.fromHistoricToMessage(Area.character, json, 'fr') ;
      if ( message ){
        self.messages.unshift(message);
      }
    });

  }

  update(){

  }

}
