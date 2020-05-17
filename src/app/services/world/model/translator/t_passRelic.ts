import {Translator} from './translator';

export class T_passRelic extends Translator{

  info = "coffre" ;
  action = "ouvrir le coffre" ;
  selfAction = "ouvrir le coffre" ;
  default = "trésor" ;


  readKey(){
    return 'passRelic' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ) {
        message = `une relique a rapporté ${user.value}  ${Translator.translate(user.relic, 'fr','designation')} à ${json.target_name}`;
    }

    return message ;
  }
}
