import {Translator} from './translator';
import {Box} from '../box';

export class T_heal extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'heal' ;
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

      if ( userBox.id == user.id && userBox.id !== targetBox.id ){
        message = `tu as soigné ${targetName} avec un D100 de ${json.D100}, ajoutant ${json.power} de vie`;
      }else if ( user.id == targetBox.id &&  userBox.id == targetBox.id ){
        message = `tu t'es auto-soigné avec un D100 de ${json.D100}, ajoutant ${json.power} de vie`;
      }else if ( user.id == targetBox.id ){
        message = `tu as été soigné par ${userName} avec un D100 de ${json.D100}, ajoutant ${json.power} de vie`;
      }else{
        message = `${userName} a soigné ${targetName} avec un D100 de ${json.D100}, lui ajoutant ${json.power} de vie`;
      }

    }else{
      message = null ;
    }


    return message ;
  }

}
