import {environment} from '../../environments/environment';
import {Net} from './net';

export class Calculation{

  static calculs = [] ;

  static init(){
    Net.http.get(`${environment.backURL}/readCalculations`, {responseType:"json",headres:Net.headers}).subscribe((res)=>{

      Calculation.calculs = res ;

    });
  }
  static get(key){
    let json = null ;
    for ( let calcul of Calculation.calculs ){
      if ( calcul.name == key ){
        json = calcul.attributes ;
      }
    }
    return json ;
  }

}
