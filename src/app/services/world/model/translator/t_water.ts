import {Translator} from './translator';
import {Box} from '../box';

export class T_water extends Translator{

  default = "eau" ;
  value = "eau" ;
  designation = `d'eau` ;


  readKey(){
    return 'water' ;
  }
  /*asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);

    if ( userBox !== null   ){

      if ( userBox.id == user.id ){
        message = `tu as arrosé un arbre lui ajoutant ${json.power} de vitalité`;
      }

    }else{
      message = null ;
    }


    return message ;
  }*/

}
