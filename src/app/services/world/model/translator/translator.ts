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


}
