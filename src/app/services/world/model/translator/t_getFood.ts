import {Translator} from './translator';
import {Box} from '../box';

export class T_getFood extends Translator{

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
      message += `${this.writeMessageInfos(json)}, vous avez trouvé ${json.power} de nourriture avec un D100 de ${json.D100}.`;
    }


    return message ;
  }
}
