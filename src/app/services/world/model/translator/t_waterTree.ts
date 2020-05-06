import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_waterTree extends Translator{

  default = "arroser" ;
  value = "arroser" ;
  designation = `d'eau` ;
  action = "arroser un arbre" ;
  selfAction = "arroser un arbre" ;
  readKey(){
    return 'waterTree' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${this.writeMessageInfos(json)}, vous arrosez un arbre. Il pourra vous fournir plus de bois.`;
    }


    return message ;
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
