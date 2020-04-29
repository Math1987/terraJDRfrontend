import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {A_flame} from '../../../services/world/controls/actions/a_flame';
import {Box} from '../../../services/world/model/box';
import {Action} from '../../../services/world/controls/actions/action';

@Component({
  selector: 'app-bewitch',
  templateUrl: './bewitch.component.html',
  styleUrls: ['./bewitch.component.scss']
})
export class BewitchComponent implements OnInit {

  static spells = [] ;
  static spellFocused = null ;

  static build(user){
    BewitchComponent.spells = [];

    let spells_ = Action.getSpellsFromReligion(user.religion) ;
    for ( let spel of spells_ ){
      BewitchComponent.spells.push(spel);
    }
    BewitchComponent.spellFocused = BewitchComponent.spells[0] ;


  }

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BewitchComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    this.form = this.formBuilder.group({
      filename: ''
    });
  }
  isFocus(spell){
    if (spell === BewitchComponent.spellFocused ){
      return true ;
    }else{
      return false ;
    }
  }
  setSpell(spell){
    BewitchComponent.spellFocused = spell ;
  }

  getSpells(){
    return BewitchComponent.spells ;
  }

  cancel(){
    this.dialogRef.close(`cancel`);
  }
  validate() {
    this.dialogRef.close(``);
  }
}
