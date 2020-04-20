import { Component, OnInit } from '@angular/core';
import {NavComponent} from '../../nav/nav.component';
import {AdminComponent} from '../admin.component';
import {environment} from '../../../environments/environment';
import {Net} from '../../services/net';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit {

  calculations = [] ;

  constructor() {}

  ngOnInit() {
    const self = this ;
    NavComponent.setInitCallBack(function(worlds) {
      console.log('init calcul');
      self.updateCalculations();
    });
  }

  updateCalculations(){
    const self = this ;
    Net.http.get(`${environment.backURL}/readCalculations`, { respsonseType: "json", headers: Net.headers}).subscribe((res)=>{

      self.calculations = res ;

    });
  }
  updateValue(key, value){
    Net.socket.emit('updateCalculation',key, value, function(res) {
      alert('votre modification a bien été prise en compte.');
    });
  }

}
