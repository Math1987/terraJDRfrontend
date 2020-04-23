import { Component, OnInit } from '@angular/core';
import {MatDialogRef,MatDialog} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-give-resource',
  templateUrl: './give-resource.component.html',
  styleUrls: ['./give-resource.component.scss']
})
export class GiveResourceComponent implements OnInit {

  static resourceFocused = 'water';

  form: FormGroup;
  resource = 'water';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GiveResourceComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    GiveResourceComponent.resourceFocused = self.resource ;
    this.form = this.formBuilder.group({
      filename: ''
    });
  }
  setResource(){
    GiveResourceComponent.resourceFocused = this.resource ;
  }
  submit(form) {
    this.dialogRef.close(`${form.value.filename}`);
  }
}
