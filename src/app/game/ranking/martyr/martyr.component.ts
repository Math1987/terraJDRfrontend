import { Component, OnInit } from '@angular/core';
import {Net} from '../../../services/net';
import {environment} from '../../../../environments/environment';
import {Area} from '../../../services/world/area';
import {NavComponent} from '../../../nav/nav.component';

@Component({
  selector: 'app-martyr',
  templateUrl: './martyr.component.html',
  styleUrls: ['./martyr.component.scss']
})
export class MartyrComponent implements OnInit {

  rows = [] ;

  constructor() {
    this.update();
  }

  ngOnInit() {

    const self = this ;
    NavComponent.functionInit = function() {
      self.update();
    };

  }
  update(){
    const self = this;
    if ( Area.world ) {
      Net.http.get(`${environment.backURL}/martyrs?world=${Area.world.name}`, {
        responseType: "json",
        headers: Net.headers
      }).subscribe((res) => {
        self.rows = self.sort(res) ;

      });
    }
  }
  sort(array){

    let clone = [] ;
    let arrayFinal = [] ;
    for ( let ar of array ){
      ar.total = ar.killed + ar.food + ar.water ;
      clone.push(ar) ;
    }
    let rank = 0 ;
    while ( clone.length > 0 ){
      let focus = 0 ;
      let max = 0 ;
      for ( let i = 0 ; i < clone.length ; i ++ ){
        if ( clone[i].total > max ){
          max = clone[i].total ;
          focus = i ;
        }
      }
      if ( arrayFinal.length <= 0 || arrayFinal[arrayFinal.length-1].total !== clone[focus].total ){
        rank ++ ;
      }
      clone[focus].rank = rank ;
      arrayFinal.push(clone[focus]);
      clone.splice(focus,1) ;
    }
    return arrayFinal;

  }

}
