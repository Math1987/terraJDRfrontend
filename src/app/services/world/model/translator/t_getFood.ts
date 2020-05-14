import {Translator} from './translator';
import {Box} from '../box';

export class T_getFood extends Translator{

  info = "chasse/ceuillette" ;
  selfAction = "chercher de la nourriture" ;
  skill = "chasseur cueilleur" ;


  constructor(){
    super();
  }
  readKey(){
    return 'getFood' ;
  }

  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${user.name} a trouvé ${json.power} de nourriture.`;
    }


    return message ;
  }
}
