import {Translator} from './translator';

export class T_flame extends Translator{

  default = "flamme" ;
  action = "flamme" ;
  selfAction = "flamme" ;

  readKey() {
    return 'flame' ;
  }
  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      if ( json.kill ){
        if ( json.target_key == "character" ) {
          message += `${this.writeMessageInfos(json)}, vous invoquez le sort de flame avec un D100 de ${json.D100}, achevant la existance de ${json.target_name} avec un dégât de ${json.power}.`;
        }else{
          message += `${this.writeMessageInfos(json)}, vous invoquez le sort de flame avec un D100 de ${json.D100}, achevant la existance vie de ${Translator.translate(json.target_key, 'fr', 'designation')} avec un dégât de ${json.power}.`;
        }
        if ( json.gold ){
          message += `Vous lui raflez au passage ${json.gold} or.`;
        }
      }else{
        if ( json.target_key == "character" ){
          message += `${this.writeMessageInfos(json)}, en invoquant le sort de flame avec un D100 de ${json.D100}, vous infligez ${json.power} de dégâts à ${json.target_name}.`;
        }else{
          message += `${this.writeMessageInfos(json)}, en invoquant le sort de flame avec un D100 de ${json.D100}, vous infligez ${json.power} de dégâts à ${Translator.translate(json.target_key, 'fr', 'designation')}.`;
        }
      }
    }


    return message ;
  }
}
