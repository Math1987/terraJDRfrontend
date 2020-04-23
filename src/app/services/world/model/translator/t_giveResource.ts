import {Translator} from './translator';
import {Box} from '../box';

export class T_giveResource extends Translator{

  default = "donner une resource";
  action = "donner une resource";

  constructor(){
    super();
  }
  readKey(){
    return 'giveResource' ;
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

      let nomResource = Translator.translate(json.resource, 'fr', 'designation') ;

      if ( userBox.id == user.id ){
        message = `tu as donné ${json.value} ${nomResource} à ${targetName}.`;
      }else if ( user.id == targetBox.id ){
        message = `tu as reçu ${json.value} ${nomResource} de la part de ${userName}.`;
      }else{
        message = `${userName} a donné ${json.value} ${nomResource} à ${targetName}`;
      }

    }else{
      message = null ;
    }


    return message ;
  }

}
