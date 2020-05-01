import { Component, OnInit } from '@angular/core';
import {Net} from '../../../services/net';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  static user = null ;
  static target = null ;

  constructor(
    private dialogRef: MatDialogRef<ManageComponent>
  ) { }

  ngOnInit() {
  }
  repair(){


    if ( ManageComponent.user.material > 0 ){
      const self = this ;
      Net.emitAction('repair', {user : ManageComponent.user, target: ManageComponent.target}, function(RepairRes) {

        self.dialogRef.close(``);

      });
    }else{
      alert('il te manque du matos pour ça');
    }


  }
  disassemble(){

    const self = this ;
    Net.emitAction('disassemble', {user : ManageComponent.user, target: ManageComponent.target}, function(RepairRes) {

      self.dialogRef.close(``);

    });

  }

}
