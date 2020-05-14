import {Translator} from './translator';
import {Area} from '../../area';


export class T_build extends Translator{

  info = "construction" ;
  action = "construire" ;
  selfAction = "construire"

  constructor(){
    super();
  }
  readKey(){
    return 'build' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
        message += `${user.name} a construit ${Translator.translate(json.build_key,'fr','designation')}.`;
    }


    return message ;
  }

}
