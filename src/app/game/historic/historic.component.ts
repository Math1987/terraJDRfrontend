import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Net} from '../../services/net';
import {environment} from '../../../environments/environment';
import {Translator} from '../../services/world/model/translator/translator';
import {Historic} from '../../services/historic';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  static messages = null ;
  static characterFocused = null ;

  static init(){

    HistoricComponent.messages = [];
    for ( let json of Historic.HISTORIC ){
      let message = Translator.asHistoricMessage(Area.character,json, 'fr');
      if ( message ){
        HistoricComponent.messages.push(message);
      }
    }

  }

  constructor() {
    HistoricComponent.init();
  }

  ngOnInit() {



  }

  update(){



  }
  getMessages(){
    return HistoricComponent.messages ;
  }

}
