import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Net} from '../../services/net';
import {environment} from '../../../environments/environment';
import {Translator} from '../../services/world/model/translator/translator';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.scss']
})
export class HistoricComponent implements OnInit {

  static messages = [] ;

  static init(){
    if ( Area.world && Area.character ) {

      HistoricComponent.messages = [] ;
      Net.http.get(`${environment.backURL}/readHistoricById?world=${Area.world.name}&id=${Area.character.id}`).subscribe((res)=>{

        console.log(res);

        for ( let i = res.length-1 ; i >= 0 ; i -- ){
          let message = Translator.asHistoricMessage(res[i].key, res[i], 'fr')  ;
          console.log(res[i].key);
          if ( message ){
            HistoricComponent.messages.unshift(message);
          }
          if ( HistoricComponent.messages.length > 100 ){
            break ;
          }
        }

      });
    }
    const self = this ;
    Net.socket.on('historic', function(json) {
      console.log(json);
      let message = Translator.asHistoricMessage(Area.character, json, 'fr') ;
      if ( message ){
        HistoricComponent.messages.unshift(message);
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
    return HistoricComponent.messages ;
  }

}
