import {Translator} from './translator';
import {Box} from '../box';

export class T_getMaterial extends Translator{

  info = "bûcheronage" ;
  default = "chercher du matériel" ;
  skill = "bûcheron" ;

  readKey(){
    return 'getMaterial' ;
  }

  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${user.name} a coupé ${json.power} de bois.`;
    }


    return message ;
  }

}
