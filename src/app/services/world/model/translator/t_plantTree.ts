import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_plantTree extends Translator{

  default = "arbre" ;
  action = "planter un arbre" ;
  selfAction = "planter un arbre";


  readKey(){
    return 'plantTree' ;
  }
  asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);


    if ( json.user.id == Area.character.id ){

      message = `tu as planter un abre.`;

    }else{
      message = null ;
    }


    return message ;
  }
}
