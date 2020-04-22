import {Translator} from './translator';
import {Box} from '../box';

export class T_getFood extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'getFood' ;
  }

  asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);


    if ( userBox !== null ){

      message = `tu as trouvé ${json.power} de nourriture avec un D100 de ${json.D100}.`;

    }else{
      message = null ;
    }


    return message ;
  }

}
