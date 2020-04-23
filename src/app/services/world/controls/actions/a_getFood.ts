import {Action} from './action';

export class A_getFood extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "getFood";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.actions > 0 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2){
    if ( key1 == this.readKey() && key1 == key2
    && user.id == target.id
    && user.actions > 0 ){
      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "actions",
        value : 1,
        nom : `point d'action`,
      }
    ];
  }


}
