import {Action} from './action';

export class A_getWater extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "getWater";
  }
  getNom(){
    return "puiser de l'eau";
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
