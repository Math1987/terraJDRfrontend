import {Action} from './actions/action';
import {A_attack} from './actions/a_attack';
import {A_heal} from './actions/a_heal';
import {A_getFood} from './actions/a_getFood';
import {A_getWater} from './actions/a_getWater';


export class Controls{

  static RESOURCES = [
    {
      key : "life",
      nom : "vie"
    },
    {
      key : "water",
      nom :  "eau"
    },
    {
      key : "food",
      nom :  "nourriture"
    },
    {
      key : "material",
      nom :  "materiel"
    },
    {
      key : "faith",
      nom :  "foi"
    },
    {
      key : "actions",
      nom :  "actions"
    },
    {
      key : "xp",
      nom :  "xp"
    }
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
      if ( resource.key == key ){
        res = resource;
        break ;
      }
    }
    return res ;
  }




}
