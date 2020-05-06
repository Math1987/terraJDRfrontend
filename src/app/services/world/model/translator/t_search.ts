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

    if ( user.id == json.user ){
      message += `${this.writeMessageInfos(json)}, vous avez trouvé ${json.power} de foi avec un D100 de ${json.D100}.`;
      if ( json.type == "gold"){
        message = `${this.writeMessageInfos(json)}, en fouillant dans une mine, vous trouvez ${json.power} d'or avec un D100 de ${json.D100}`;
      }else if ( json.type == "superGold"){
        message = `${this.writeMessageInfos(json)}, en fouillant dans une mine, vous trouvez ${json.power} d'or avec un D100 de ${json.D100}`;
      }else if ( json.type == "relic"){
        message = `${this.writeMessageInfos(json)}, en fouillant dans une mine, vous trouvez une relique magique`;
      }else if ( json.type == "xp" ){
        message = `${this.writeMessageInfos(json)}, en fouillant dans une mine, vous vous faites une crampe aux bras et ne trouvez rien...mais gagnez 1 en xp`;
      }
    }


    return message ;
  }
  /*asMessage(user, json, language) {


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
  }*/

}
