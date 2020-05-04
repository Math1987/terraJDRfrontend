import {Translator} from './translator';
import {Box} from '../box';

export class T_openchest extends Translator{

  action = "ouvrir le coffre" ;
  selfAction = "ouvrir le coffre" ;
  default = "trésor" ;


  readKey(){
    return 'openChest' ;
  }
  asMessage(user, json, language) {

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
  }
}
