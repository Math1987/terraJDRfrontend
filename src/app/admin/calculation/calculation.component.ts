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
      self.updateCalculations();
    });
  }

  updateCalculations(){
    const self = this ;
    Net.http.get(`${environment.backURL}/readCalculations`, { respsonseType: "json", headers: Net.headers}).subscribe((res)=>{

      self.calculations = res ;
      self.calculations = [] ;
      for ( let calcul of res ){
        let array = [] ;
        for ( let key of Object.keys(calcul.attributes) ){
          array.push({
            key : key,
            value : calcul.attributes[key]
          });
        }
        self.calculations.push({
          name : calcul.name,
          attributes : array
        });
      }
    });
  }
  updateValue(name, attribute, value){
    Net.socket.emit('updateCalculation',name ,attribute ,value, function(res) {
      alert('votre modification a bien été prise en compte.');
    });
  }

}
