import {Action} from './action';
import {Area} from '../../area';
import {View} from '../../view/view';

export class A_repair extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "repair";
  }
  isActive(): boolean {
    return true;
  }
  matchInteraction(user, key1, target, key2, contextViews){
      return false ;
  }
  getCosts(){
    return [];
  }


}
