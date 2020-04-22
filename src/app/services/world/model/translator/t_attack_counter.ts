import {Translator} from './translator';
import {Box} from '../box';

export class T_attack_counter extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'attack_counter' ;
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
        message = `tu as contre-attaqué ${targetName} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts`;
      }else if ( user.id == targetBox.id ){
        message = `tu as été contre-attaqué par ${userName} avec un D100 de ${json.D100}, subissant ${json.power} de dégâts`;
      }else{
        message = `${userName} a contre-attaqué ${targetName} avec un D100 de ${json.D100}, lui infligeant ${json.power} de dégâts`;
      }

    }else{
      message = null ;
    }


    return message ;
  }

}
