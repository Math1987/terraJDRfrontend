import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';
import {MatDialogRef} from '@angular/material';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {Translator} from '../../model/translator/translator';
import {BewitchComponent} from '../../../../game/dialogs/bewitch/bewitch.component';

export class A_bewitch extends Action{

  fileNameDialogRef: MatDialogRef<BewitchComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "bewitch";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.faith >= 10 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    if ( user.faith >= 10
      && user.id === target.id
      && user.id === Area.character.id ){
      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "faith",
        value : 10,
        nom : `foi`,
      }
    ];
  }
  use(user, target){
    const self = this ;

    BewitchComponent.build(user);

    this.fileNameDialogRef = Dialog.dialog.open(BewitchComponent);

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {

        value = Math.max(1, value);

        console.log(BewitchComponent.spellFocused);

        Net.emitAction( BewitchComponent.spellFocused.readKey(), {
          user : user,
          target : target
        }, function(giveResourceRes) {

          Box.lastUpdate = new Date().getTime();

        });


      });
  }

}
