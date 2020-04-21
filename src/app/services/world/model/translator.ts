export class Translator{

  static KEYS = {

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
        interaction : "se soigner",
        skill : "défense"
      }
    },
    getFood : {
      fr : {
        default : 'chercher de la nourriture'
      }
    }
  };


  static translate(key, language, type ){
    if ( Translator.KEYS[key] && Translator.KEYS[key][language] && Translator.KEYS[key][language][type]){
      return Translator.KEYS[key][language][type] ;
    }else{
      return key ;
    }

  }

}
