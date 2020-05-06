import {Translator} from './translator';
import {Box} from '../box';

export class T_getWater extends Translator{

  selfAction = "puiser de l'eau";
  skill = "sourcier" ;


  constructor(){
    super();
  }
  readKey(){
    return 'getWater' ;
  }

  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${this.writeMessageInfos(json)}, vous avez trouvé ${json.power} d'eau avec un D100 de ${json.D100}.`;
    }


    return message ;
  }

}
