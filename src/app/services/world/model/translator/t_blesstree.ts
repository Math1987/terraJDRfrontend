import {Translator} from './translator';
import {Area} from '../../area';

export class T_blesstree extends Translator{

  info = "bénédiction de forêt" ;
  action = "bénédiction de forêt" ;
  selfAction  = "bénédiction de forêt" ;
  default = "bénédiction de forêt" ;
  skill = "bénédiction de forêt" ;


  readKey(){
    return 'blesstree' ;
  }
  asMessage(user, json, language) {


    let message = '' ;

    if ( user.id == json.user ){
      /*if( json.builder && json.builder == user.name ){
        message += `${user.name} a béni un arbre.`;
      }else if( json.builder && json.builder !== user.name ){
        message += `${this.writeMessageInfos(json)},  vous avez béni l'arbre de ${json.builder}. Il va fournir plus de bois.`;
      }else{
        message += `${this.writeMessageInfos(json)},  vous avez béni un arbre. Il va fournir plus de bois.`;
      }*/
      message = `${user.name} a béni un arbre.`;
    }



    return message ;
  }
}
