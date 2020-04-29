import {Action} from './actions/action';
import {A_attack} from './actions/a_attack';
import {A_heal} from './actions/a_heal';
import {Translator} from '../model/translator/translator';
import {A_giveResource} from './actions/a_giveResource';
import {A_getResource} from './actions/a_getResource';
import {A_waterTree} from './actions/a_waterTree';
import {A_plantTree} from './actions/a_plantTree';
import {A_levitation} from './actions/a_levitation';
import {A_search} from './actions/a_search';
import {A_flame} from './actions/a_flame';
import {A_bewitch} from './actions/a_bewitch';
import {A_protection} from './actions/a_protection';


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
      new A_search(),

      new A_bewitch(),
      new A_levitation(),
      new A_flame(),
      new A_protection(),
      //new A_getFood(),
      //new A_getWater(),
      new A_getResource(),
      new A_giveResource(),

      new A_waterTree(),
      new A_plantTree()
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
