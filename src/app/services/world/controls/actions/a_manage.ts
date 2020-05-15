import {Action} from './action';
import {Net} from '../../../net';
import {MatDialogRef} from '@angular/material';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {Dialog} from '../../../dialog';
import {filter} from 'rxjs/operators';
import {Box} from '../../model/box';
import {Translator} from '../../model/translator/translator';
import {View} from '../../view/view';
import {ManageComponent} from '../../../../game/dialogs/manage/manage.component';
import {DialogueService} from '../../../../game/dialogs/dialogue.service';

export class A_manage extends Action{

  fileNameDialogRef: MatDialogRef<ManageComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "manage";
  }
  matchInteraction(user, key1, target, key2, contextViews){

    if ( target.key == "fortification"
      && target.race == user.race
      && target.x == user.x && target.y == user.y
      && user.id !== target.id ){

      let canMatch = true ;
      if ( contextViews && contextViews.length > 0 ) {
        for (let views of contextViews) {
          for ( let view of views ){
            if ( view && view.box.key == "character" && view.box.race !== user.race ){
              //canMatch = false;
            }
          }
        }
      }


      return canMatch ;
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

    ManageComponent.user = user ;
    ManageComponent.target = target ;

    DialogueService.open = true ;
    this.fileNameDialogRef = Dialog.dialog.open(ManageComponent);
    this.fileNameDialogRef.afterClosed().subscribe(()=>{
      DialogueService.open = false ;
    });

    this.fileNameDialogRef
      .afterClosed()
      .subscribe(value => {


      });
  }

}
