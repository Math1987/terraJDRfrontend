import {Translator} from './translator';
import {Box} from '../box';

export class T_getMaterial extends Translator{

  default = "chercher du matériel" ;
  skill = "bûcheron" ;

  readKey(){
    return 'getMaterial' ;
  }

  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${this.writeMessageInfos(json)}, vous avez coupé ${json.power} de bois avec un D100 de ${json.D100}.`;
    }


    return message ;
  }

}
