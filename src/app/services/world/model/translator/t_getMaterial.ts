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
    let userBox = Box.readById(json.user);


    if ( userBox !== null ){

      message = `tu as coupé du bois avec un D100 de ${json.D100}, récoltant ${json.power} de matériel.`;

    }else{
      message = null ;
    }


    return message ;
  }

}
