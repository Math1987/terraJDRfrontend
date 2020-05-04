import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Net} from '../../../services/net';
import {Box} from '../../../services/world/model/box';

@Component({
  selector: 'app-get-resource',
  templateUrl: './get-resource.component.html',
  styleUrls: ['./get-resource.component.scss']
})
export class GetResourceComponent implements OnInit {

  static resourceFocused = 'getWater';
  static canGetMaterial = false ;
  static user ;
  static target ;

  resource = 'getWater';

  constructor(
    private dialogRef: MatDialogRef<GetResourceComponent>
  ) {}

  ngOnInit() {
    const self = this ;
    GetResourceComponent.resourceFocused = self.resource ;
  }
  canGetMaterial(){
    return GetResourceComponent.canGetMaterial ;
  }
  setResource(){
    GetResourceComponent.resourceFocused = this.resource ;
  }
  validate(){

    this.dialogRef.close(``);
    Net.emitAction( GetResourceComponent.resourceFocused, {
      user : GetResourceComponent.user,
      target : GetResourceComponent.target,
    }, function(giveResourceRes) {

      Box.lastUpdate = new Date().getTime();

    });

    console.log('test');
  }
}
