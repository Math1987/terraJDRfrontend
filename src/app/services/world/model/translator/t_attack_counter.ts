import {Translator} from './translator';
import {Box} from '../box';
import {Area} from '../../area';

export class T_attack_counter extends Translator{

  constructor(){
    super();
  }
  readKey(){
    return 'attack_counter' ;
  }

  asMessage(user, json, language) {


    let message = '' ;
    let date = `Le ${new Date(json.date).getDate()}/${new Date(json.date).getMonth()}/${new Date(json.date).getFullYear()} à ${new Date(json.date).toLocaleTimeString()},` ;
    let py = json.x - Math.floor(Area.world.width/2);
    let px = - json.y+ Math.floor(Area.world.height/2);

    if ( user.id == json.target ){
      if ( json.target_key == 'character' ){
        if ( json.kill ) {
          message += `${this.writeMessageInfos(json)}, vous avez contre-attaqué ${json.target_name} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts`;
        }else{
          message += `${this.writeMessageInfos(json)}, vous avez tué ${json.target_name} en contre-attaquant avec un D100 de ${json.D100} lui infligeant ${json.power} de dégâts. Il l'avait cherché.`;
        }
      }else{
        message += `${date} en case ${px}x, ${py}y, vous avez contre-attaqué ${Translator.translate(json.target_key, 'fr', 'designation')} avec un D100 de ${json.D100}, infligeant ${json.power} de dégâts`;
      }
    }else if ( user.id == json.user ){
      if ( json.target_key == 'character' ){
        if ( json.kill ) {
          message += `${this.writeMessageInfos(json)}, vous êtes mort en vous faisant contre-attaquer par ${json.target_name} avec un D100 de ${json.D100}, subissant ${json.power} de dégâts`;
        }else{
          message += `${this.writeMessageInfos(json)}, votre attaque a lamentablement échoué et vous vous êtes fait contre-attaqué par ${json.target_name} avec un D100 de ${json.D100}, subissant ${json.power} de dégâts`;
        }
      }else{
        message += `${this.writeMessageInfos(json)}, votre attaque a lamentablement échoué et vous vous êtes fait contre-attaqué par ${Translator.translate(json.target_key, 'fr', 'designation')} avec un D100 de ${json.D100}, subissant ${json.power} de dégâts`;
      }
    }


    return message ;
  }

}
