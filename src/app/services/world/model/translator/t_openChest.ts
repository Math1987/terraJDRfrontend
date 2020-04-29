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
    console.log('openChest message');

    let message = '' ;
    let userBox = Box.readById(json.user);

    if ( userBox !== null   ){

      if ( userBox.id == user.id ){
        if ( json.gold ){
          message = `en ouvrant le coffre, tu trouve ${json.gold} or`;
        }else{
          message = `en ouvrant le coffre, tu trouve une superbe relique magique`;
        }

      }

    }else{
      message = null ;
    }


    return message ;
  }
}
