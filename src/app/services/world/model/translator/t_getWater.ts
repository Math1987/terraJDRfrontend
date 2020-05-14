import {Translator} from './translator';
import {Box} from '../box';

export class T_getWater extends Translator{

  info = "sourcier" ;
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
      message += `${user.name} a trouvé ${json.power} d'eau.`;
    }


    return message ;
  }

}
