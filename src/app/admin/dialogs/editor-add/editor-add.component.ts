import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {View} from '../../../services/world/view/view';
import {Net} from '../../../services/net';

@Component({
  selector: 'app-editor-add',
  templateUrl: './editor-add.component.html',
  styleUrls: ['./editor-add.component.scss']
})
export class EditorAddComponent implements OnInit {

  static resourceFocused = 'getWater';

  form: FormGroup;
  resource = 'getWater';

  static builds = [];
  static focused = 0 ;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditorAddComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    EditorAddComponent.resourceFocused = self.resource ;
    this.form = this.formBuilder.group({
      filename: ''
    });
  }
  getBuilds(){
    return EditorAddComponent.builds ;
  }
  setResource(){
    EditorAddComponent.resourceFocused = this.resource ;
  }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
  focus(i){
    console.log(i);
    EditorAddComponent.focused = i ;
  }
  isFocus(builder){
    if ( builder == EditorAddComponent.builds[EditorAddComponent.focused]){
      return true ;
    }else{
      return false ;
    }
  }
  build(){

    console.log('posiution');
    console.log(View.focused);

    let position = View.getFocusedPosition() ;

    console.log(position);

    Net.socket.emit('create',
      {
        key: EditorAddComponent.builds[EditorAddComponent.focused].key,
        x: position.x,
        y: position.y
      },
      function(resBuild) {
    });
  }
}
