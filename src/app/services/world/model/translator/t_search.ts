import {Translator} from './translator';
import {Box} from '../box';

export class T_search extends Translator{

  default = "fouiller" ;
  value = "fouiller" ;
  designation = `de fouille` ;
  action = "fouiller" ;
  selfAction = "fouiller";


  readKey(){
    return 'search' ;
  }
  asMessage(user, json, language) {


    let message = '' ;
    let userBox = Box.readById(json.user);

    if ( userBox !== null   ){

      if ( userBox.id == user.id ){
        if ( json.type == "gold"){
          message = `tu as fouillé dans une mine, trouvant ${json.power} d'or avec un D100 de ${json.D100}`;
        }else if ( json.type == "superGold"){
          message = `tu as fouillé dans une mine, trouvant ${json.power} d'or avec un D100 de ${json.D100}`;
        }else if ( json.type == "relic"){
          message = `tu as fouillé dans une mine, trouvant une relique`;
        }else if ( json.type == "xp" ){
          message = `tu as fouillé dans une mine, ne trouvant rien de particulier, mais gagnant 1 en xp`;
        }

      }

    }else{
      message = null ;
    }


    return message ;
  }

}
