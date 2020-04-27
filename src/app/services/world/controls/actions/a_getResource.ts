import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {Translator} from '../../model/translator/translator';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {MatDialogRef} from '@angular/material';

export class A_getResource extends Action{


  fileNameDialogRef: MatDialogRef<GetResourceComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "getResource";
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
    if ( Box.isResource(key1) && Box.isGround(target[key2])
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
        key : "actions",
        value : 1,
        nom : `point d'action`,
      }
    ];
  }

  use(user, target){
    const self = this ;
    this.fileNameDialogRef = Dialog.dialog.open(GetResourceComponent);

    let tree = Box.isInPositionOf("tree", user.x, user.y );
    if ( tree ){
      GetResourceComponent.canGetMaterial = true ;
    }else{
      GetResourceComponent.canGetMaterial = false ;
    }

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {


          Net.socket.emit('action', GetResourceComponent.resourceFocused, {
            user : user,
            target : target,
          }, function(giveResourceRes) {

            Box.lastUpdate = new Date().getTime();

          });



      });
  }
}
