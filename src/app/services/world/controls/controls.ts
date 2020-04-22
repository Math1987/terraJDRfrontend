import {Action} from './actions/action';
import {A_attack} from './actions/a_attack';
import {A_heal} from './actions/a_heal';
import {A_getFood} from './actions/a_getFood';
import {A_getWater} from './actions/a_getWater';
import {Translator} from '../model/translator/translator';


export class Controls{

  static RESOURCES = [
    'life' ,'water' ,'food' ,'material' ,'faith' ,'actions' ,'xp'
  ];
  static SKILLS = [
    'attack' ,"defense" ,"getWater" ,"getFood" ,"getMaterial" ,"getFaith"
  ];

  static init(){
    Action.init([
      new A_attack(),
      new A_heal(),
      new A_getFood(),
      new A_getWater(),
    ]);
  }

  static getResourcesFromObj(obj){
    let resources = [] ;
    for ( let key of Object.keys(obj)){
      let resource = Controls.getRessourceFromKey(key);
      if ( resource ){
        resource.value = obj[key] ;
        resources.push(resource);
      }
    }
    return resources ;
  }
  static getRessourceFromKey(key){
    let res = null ;
    for ( let resource of Controls.RESOURCES ){
      if ( resource == key ){
        res = {
          key : key,
          nom : Translator.translate(key, "fr", 'default')
      };
        break ;
      }
    }
    return res ;
  }

  static getSkillFromKey(key){
    let res = null ;
    for ( let skill of Controls.SKILLS ){
      if ( skill == key ){
        res = {
          key : key,
          nom : Translator.translate(key, 'fr', 'skill')
        };
        break ;
      }
    }
    return res ;
  }




}
