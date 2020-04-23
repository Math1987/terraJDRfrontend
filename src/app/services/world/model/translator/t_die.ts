import {Translator} from './translator';
import {Box} from '../box';

export class T_die extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'die' ;
  }

  asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);
    let targetBox = Box.readById(json.target);

    if ( userBox !== null  && targetBox !== null ){



      let targetName = targetBox.name ;
      if ( !targetName ){
        targetName = Translator.translate(targetBox.key,'fr', 'singular') ;
      }
      let userName = userBox.name ;
      if ( !userName ){
        userName = Translator.translate(userBox.key,'fr', 'singular') ;
      }

      if ( userBox.id == user.id ){
        message = `tu est mort.`;
      }else if ( user.id == targetBox.id ){
        message = `tu as tué ${userName}.`;
      }else{
        message = `${targetName} a tué ${userName}.`;
      }

    }else{
      message = null ;
    }


    return message ;
  }

}
