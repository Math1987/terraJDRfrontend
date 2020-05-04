export class Translator{

  static TRANSLATORS = [];

  static init(translators){
    Translator.TRANSLATORS = translators;
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
  asMessage(user, json, language){}
  asHistoric(user,json, language){

    let message = '' ;
    let asMessage = this.asMessage(user, json, language) ;
    if ( asMessage !== null && json.date ){
      message = `le ${new Date(json.date).getDate()}/${new Date(json.date).getMonth()}/${new Date(json.date).getFullYear()} à ${new Date(json.date).toLocaleTimeString()}: ${asMessage}`;
    }
    return message ;
  }

}
