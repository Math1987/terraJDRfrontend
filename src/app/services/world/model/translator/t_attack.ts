import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_attack extends Translator{

  action = "attaquer" ;
  skill = "attaque" ;

  constructor(){
    super();
  }
  readKey(){
    return 'attack' ;
  }

  asMessage(user, json, language) {

      let message = '' ;

      if ( user.id == user.id ){
        if ( json.target_key == 'character' ){
          if ( json.kill ){
            message += `${this.writeMessageInfos(json)}, vous avez massacré ${json.target_name} sans pitié, lui assénant un coup fatal avec un D100 de ${json.D100}, générant ${json.power} de dégâts.`;
            if ( json.gold && json.gold > 0 ){
              message += `Vous lui raflez au passage ${json.gold} or`;
            }
          }else{
            message += `${this.writeMessageInfos(json)}, vous avez attaqué ${json.target_name} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts.`;
          }
        }else{
            if ( json.kill ) {
              message += `${this.writeMessageInfos(json)}, vous avez éradiqué ${Translator.translate(json.target_key, 'fr', 'designation')} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts.`;
              if ( json.gold && json.gold > 0 ){
                message += `Vous trouvez entre les os broyés par vos coups violent ${json.gold} or.`;
              }
            }else{
              message += `${this.writeMessageInfos(json)}, vous avez attaqué ${Translator.translate(json.target_key, 'fr', 'designation')} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts.`;
            }
        }
      }


      /*if ( userBox !== null  && targetBox !== null ){

        let targetName = targetBox.name ;
        if ( !targetName ){
          targetName = Translator.translate(targetBox.key,'fr', 'singular') ;
        }
        let userName = userBox.name ;
        if ( !userName ){
          userName = Translator.translate(userBox.key,'fr', 'singular') ;
        }

        if ( userBox.id == user.id ){
          message = `tu as attaqué ${targetName} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts`;
        }else if ( user.id == targetBox.id ){
          message = `tu as été attaqué par ${userName} avec un D100 de ${json.D100}, subissant ${json.power} de dégâts`;
        }else{
          message = `${userName} a attaqué ${targetName} avec un D100 de ${json.D100}, lui infligeant ${json.power} de dégâts`;
        }

      }else{
        message = null ;
      }*/


      return message ;
  }

}
