import {Area} from '../../area';
import {Net} from '../../../net';
import {environment} from '../../../../../environments/environment';

export class Translator{

  static METADATAS = {} ;

  static TRANSLATORS = [];

  static init(translators){
    Translator.TRANSLATORS = translators;

    Net.http.get(`${environment.backURL}/readMetadatas`, { responseType : 'json', headers : Net.headers } ).subscribe((res)=>{

      Translator.METADATAS = res ;

      console.log(res);

    });

  }

  static translate(key, language, type ){

    let translate = null ;
    for ( let translator of Translator.TRANSLATORS ){
      translate = translator.translate(key, type) ;
      if ( translate ){
        break ;
      }
    }
    if ( translate === null ){
      translate = key ;
    }

    return translate ;

  }

  static fromHistoricToMessage(playerChara, json, language){
    let message = null ;
    for ( let ts of Translator.TRANSLATORS ){
      if ( ts.readKey() == json.key ){
        message = ts.asMessage(playerChara, json, language);
      }
    }
    return message ;
  }
  static fromHistoricToInfos(playerChara, json, language){
    let message = null ;
    for ( let ts of Translator.TRANSLATORS ){
      if ( ts.readKey() == json.key ){
        message = ts.asInfos(playerChara, json, language);
      }
    }
    return message ;
  }
  static asHistoricMessage(playerChara, json, language){
    let message = null ;
    for ( let ts of Translator.TRANSLATORS ){
      if ( ts.readKey() == json.key ){
        message = ts.asHistoric(playerChara, json, language);
      }
    }
    return message ;
  }

  constructor(){}
  readKey(){
    return '' ;
  }
  translate(key, type){
    let translate = null ;
    if ( this.readKey() == key ){
      translate = this[type] ;
    }
    return translate ;
  }

  writeMessageInfos(json){
    if( json.date && json.x && json.y){
      let py = json.x - Math.floor(Area.world.width/2);
      let px = - json.y+ Math.floor(Area.world.height/2);
      return `Le ${new Date(json.date).getDate()}/${new Date(json.date).getMonth()}/${new Date(json.date).getFullYear()} à ${new Date(json.date).toLocaleTimeString()}, en case ${px}x, ${py}y` ;
    }else{
      return '';
    }
  }

  asMessage(user, json, language){}
  asHistoric(user,json, language){

    /*let message = '' ;
    let asMessage = this.asMessage(user, json, language) ;
    if ( asMessage !== null && json.date ){
      message = `le ${new Date(json.date).getDate()}/${new Date(json.date).getMonth()}/${new Date(json.date).getFullYear()} à ${new Date(json.date).toLocaleTimeString()}: ${asMessage}`;
    }*/
    return this.asMessage(user, json, language) ;
  }
  getTypeOfMessage(user, json, language){
    return Translator.translate(this.readKey(), language, "info") ;
  }
  asInfos(user, json, language){
    if ( json.date && json.x ) {
      let py = json.x - Math.floor(Area.world.width / 2);
      let px = -json.y + Math.floor(Area.world.height / 2);
      return {
        date: json.date,
        date_fr: `${new Date(json.date).getDate()}/${new Date(json.date).getMonth()} ${new Date(json.date).getHours()}h${new Date(json.date).getMinutes()}`,
        position: {x:px,y:py},
        type : this.getTypeOfMessage(this.readKey(), "fr",'info'),
        D100 : json.D100,
        message : this.asMessage(user, json, language)
      };
    }else{
      return null ;
    }
  }

}
