import {Action} from './action';
import {Net} from '../../../net';
import {MatDialogRef} from '@angular/material';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {Dialog} from '../../../dialog';
import {filter} from 'rxjs/operators';
import {Box} from '../../model/box';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';

export class A_giveResource extends Action{

  fileNameDialogRef: MatDialogRef<GiveResourceComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "giveResource";
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){
    if ( key1 == "water"
      && key1 == key2
      && user.id !== target.id
      && ( !('race' in target && 'race' in user) || target.race === user.race )
    ){
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
    this.fileNameDialogRef = Dialog.dialog.open(GiveResourceComponent);

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {

        value = Math.max(1, value);

        if ( user[GiveResourceComponent.resourceFocused] <= 0 ){
          alert(`tu n'a pas assez ${Translator.translate(GiveResourceComponent.resourceFocused, 'fr', 'designation')} pour en donner.`)
        }else{
          Net.socket.emit('action', self.readKey(), {
            user : user,
            target : target,
            resource : GiveResourceComponent.resourceFocused,
            value : value
          }, function(giveResourceRes) {

            Box.lastUpdate = new Date().getTime();

          });
        }



      });
  }

}
