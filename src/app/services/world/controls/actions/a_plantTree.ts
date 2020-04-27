import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';

export class A_plantTree extends Action{

  constructor(){
    super();
  }
  readKey(){
    return "plantTree";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.water >= 50 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2){

    if ( user.water >= 50
      && !Box.gotSolidInPosition(user.x, user.y)
      && user.id === Area.character.id ){

      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "water",
        value : 50,
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
