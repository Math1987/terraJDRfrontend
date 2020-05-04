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
    if ( json.user.id == Area.character.id ){
      message = `tu as planter un abre.`;

    }


    return message ;
  }
}
