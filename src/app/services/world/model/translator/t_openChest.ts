import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_openchest extends Translator{

  info = "coffre" ;
  action = "ouvrir le coffre" ;
  selfAction = "ouvrir le coffre" ;
  default = "trésor" ;


  readKey(){
    return 'openChest' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ) {

      if (json.gold) {
        if (json.gold >= 50) {
          message = `${user.name} ouvre un coffre mystérieux et trouve ${json.gold} or.`;
        } else {
          message = `${user.name} ouvre un coffre mystérieux et trouve ${json.gold} or.`;
        }
      } else {
        message = `${user.name} ouvre un coffre mystérieux et trouve une superbe relique magique qui contient ${Translator.translate(json.relic, "fr", "default")}`;
      }
    }


    return message ;
  }
  /*asMessage(user, json, language) {

    let message = null ;

    if ( json.gold ){
      if ( json.gold >= 50 ){
        message = `en ouvrant un coffre mystérieux, tu trouve ${json.gold} or.`;
      }else{
        message = `en ouvrant un coffre, tu trouve ${json.gold} or.`;
      }
    }else{
      message = `en ouvrant le coffre, tu trouve une superbe relique magique qui contient ${Translator.translate(json.relic,"fr","default")}`;
    }



    return message ;
  }*/
}
