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
    let userBox = Box.readById(json.user);


    if ( userBox !== null ){

      message = `tu as puisé ${json.power} d'eau avec un D100 de ${json.D100}.`;

    }else{
      message = null ;
    }


    return message ;
  }

}
