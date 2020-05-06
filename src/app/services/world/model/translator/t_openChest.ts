import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_openchest extends Translator{

  action = "ouvrir le coffre" ;
  selfAction = "ouvrir le coffre" ;
  default = "trésor" ;


  readKey(){
    return 'openChest' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ) {
      message += `${this.writeMessageInfos(json)}, vous avez invoqué le sort de "vision divine", et trouvé que la mine la plus proche se trouve à  ${-json.y + Area.world.height / 2}x, ${json.x - Area.world.width / 2}y.`;

      if (json.gold) {
        if (json.gold >= 50) {
          message = `${this.writeMessageInfos(json)}, vous ouvrez un coffre mystérieux, et trouvez ${json.gold} or.`;
        } else {
          message = `${this.writeMessageInfos(json)}, vous ouvrez un coffre mystérieux, et trouvez ${json.gold} or.`;
        }
      } else {
        message = `${this.writeMessageInfos(json)}, vous trouvez une superbe relique magique qui contient ${Translator.translate(json.relic, "fr", "default")}`;
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
