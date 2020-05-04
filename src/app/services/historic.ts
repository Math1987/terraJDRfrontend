import {Area} from './world/area';
import {Net} from './net';
import {environment} from '../../environments/environment';
import {Translator} from './world/model/translator/translator';

export class Historic{

  static HISTORIC = [] ;
  static CHARACTER_FOCUSED = null ;

  static callBackNewRow = null ;

  static init(){

    if ( Area.world && Area.character ) {

      console.log('cherch ' + Area.character.id );

      Historic.HISTORIC = [] ;
      Net.http.get(`${environment.backURL}/readHistoricById?world=${Area.world.name}&id=${Area.character.id}`).subscribe((res)=>{

        for ( let row of res ){
          console.log(row);
          Historic.HISTORIC.unshift(row);
        }

      });
    }
    Net.socket.on('historic', function(json) {
        Historic.HISTORIC.unshift(json);
        if ( Historic.callBackNewRow ){
          Historic.callBackNewRow(json);
        }
    });

  }
  static check(){
    if ( Area.world && Area.character && (!Historic.HISTORIC || Historic.CHARACTER_FOCUSED !== Area.character) ){
      Historic.init();
      Historic.CHARACTER_FOCUSED = Area.character ;
      console.log('init historic');
    }
  }

}
