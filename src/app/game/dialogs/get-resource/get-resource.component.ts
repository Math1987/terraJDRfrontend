import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Area} from '../../../services/world/area';

@Component({
  selector: 'app-get-resource',
  templateUrl: './get-resource.component.html',
  styleUrls: ['./get-resource.component.scss']
})
export class GetResourceComponent implements OnInit {

  static resourceFocused = 'getWater';
  static canGetMaterial = false ;

  form: FormGroup;
  resource = 'getWater';



  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GetResourceComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    GetResourceComponent.resourceFocused = self.resource ;
    this.form = this.formBuilder.group({
      filename: ''
    });
  }
  canGetMaterial(){
    return GetResourceComponent.canGetMaterial ;
  }
  setResource(){
    GetResourceComponent.resourceFocused = this.resource ;
  }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
}
