import {Translator} from './translator';
import {Area} from '../../area';


export class T_build extends Translator{

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
        message += `${this.writeMessageInfos(json)}, vous avez construit ${Translator.translate(json.build_key,'fr','designation')}.`;
    }


    return message ;
  }

}
