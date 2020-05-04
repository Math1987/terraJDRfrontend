import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Translator} from '../../../services/world/model/translator/translator';
import {FormBuilder, FormGroup} from '@angular/forms';
import {View} from '../../../services/world/view/view';
import {Net} from '../../../services/net';
import {Area} from '../../../services/world/area';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {
  static resourceFocused = 'getWater';

  form: FormGroup;
  resource = 'getWater';

  static builds = [];
  static focused = 0 ;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BuildComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    BuildComponent.resourceFocused = self.resource ;
    this.form = this.formBuilder.group({
      filename: ''
    });
  }
  getBuilds(){
    return BuildComponent.builds ;
  }
  setResource(){
    BuildComponent.resourceFocused = this.resource ;
  }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
  focus(i){
    BuildComponent.focused = i ;
  }
  isFocus(builder){
    if ( builder == BuildComponent.builds[BuildComponent.focused]){
      return true ;
    }else{
      return false ;
    }
  }
  build(){

    let x = Area.character.x ;
    let y = Area.character.y ;

    Net.emitAction("build",
      {
        user : Area.character,
        target : {
          key: BuildComponent.builds[BuildComponent.focused].key,
          x: x,
          y: y
        }
      },
      function(resBuild) {

        if ( "fortifications" in Area.character ){
          Area.character.fortifications.push(resBuild.id);
        }else{
          Area.character.fortifications = [resBuild.id];
        }

      });
  }
}
