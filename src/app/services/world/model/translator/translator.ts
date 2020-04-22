export class Translator{

  static TRANSLATORS = [];

  static KEYS = {

    ground : {
      fr: {
        default: "désert"
      }
    },
    neutral : {
      fr: {
        default: "zonne neutre"
      }
    },

    life : {
      fr : {
        default : "vie"
      }
    },
    water : {
      fr : {
        default: "eau"
      }
    },
    food : {
      fr : {
        default: "nourriture"
      }
    },
    material: {
      fr : {
        default: "materiel"
      }
    },
    faith:{
      fr : {
        default: "foi"
      }
    },

    human : {
      fr : {
        default : 'humain'
      }
    },
    dwarf : {
      fr : {
        default : "nain"
      }
    },
    vampire : {
      fr :{
        default : "vampire"
      }
    },
    elf : {
      fr : {
        default : "elfe"
      }
    },
    squeleton :{
      fr : {
        default : "squelette",
        singular : "un squelette"
      }
    },

    attack: {
      fr : {
        default : "attaque",
        action : "attaquer",
        skill : "attaque"
      }
    },
    defense: {
      fr : {
        default : "défense",
        action : "soigner",
        selfAction : "se soigner",
        skill : "défense"
      }
    },
    getWater : {
      fr : {
        default : `puiser de l'eau`,
        skill : `sourcier`
      }
    },
    getFood : {
      fr : {
        default : 'chercher de la nourriture',
        skill : 'chasseur cueilleur'
      }
    },
    getMaterial : {
      fr : {
        default : `bûcheron`,
        skill : `bûcheron`
      }
    },
    getFaith : {
      fr : {
        default : `foi`,
        skill : `prier`
      }
    },
  };


  static init(translators){
    Translator.TRANSLATORS = translators;
  }

  static translate(key, language, type ){

    if ( "action" !== type && "selfAction" !== type && "skill" !== type && "singular" !== type){
      type = "default";
    }

    if ( Translator.KEYS[key] && Translator.KEYS[key][language] && Translator.KEYS[key][language][type]){
      return Translator.KEYS[key][language][type] ;
    }else{
      return key ;
    }

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
  asDefault(language){
    return '';
  }
  asAction(language){
    return '';
  }
  asSelfAction(language){
    return '' ;
  }
  asSkill(language){
    return '';
  }
  asMessage(user, json, language){}


}
