import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';

export class A_waterTree extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "waterTree";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.water >= 10 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2){

    if ( target[key2] == "tree" && user.water >= 10 && target.vitality < target.vitality_max
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.actions > 0 ){

      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "water",
        value : 10,
        nom : `eau`,
      }
    ];
  }
  use(user, target){
    const self = this ;

    Net.socket.emit('action', self.readKey(), {
      user : user,
      target : target,
    }, function(waterRes) {

    });


  }

}
