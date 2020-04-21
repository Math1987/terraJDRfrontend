import {Action} from './action';

export class A_getFood extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "getFood";
  }
  getNom(){
    return "chercher de la nourriture";
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
