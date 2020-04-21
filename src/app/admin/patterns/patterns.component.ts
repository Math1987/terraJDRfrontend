import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Net} from '../../services/net';
import {environment} from '../../../environments/environment';
import {Box} from '../../services/world/model/box';
import {NavComponent} from '../../nav/nav.component';
import {AdminComponent} from '../admin.component';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.component.html',
  styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {

  patterns = [] ;

  constructor() { }

  ngOnInit() {
    const self = this ;
    NavComponent.setInitCallBack(function(worlds) {
      self.updatePatterns();
      AdminComponent.changeWorldFunction = function() {
        self.updatePatterns();
      }
    });
  }
  updatePatterns(){
    const self = this ;
    if ( Area.world ){
      Net.http.get(`${environment.backURL}/readWorldPatterns?world=${Area.world.name}`, {respsoneType:'json', headers: Net.headers}).subscribe((res)=>{

        self.patterns = [] ;
        for ( let pat of res ){
          let instanciables = [] ;
          for ( let i = 0 ; i < Object.keys(pat.instanciables).length ; i ++ ){
            if ( !Box.isProtectedKey(Object.keys(pat.instanciables)[i])){
              instanciables.push({
                key: Object.keys(pat.instanciables)[i],
                value: Object.values(pat.instanciables)[i]
              });
            }
          }
          let globals = [] ;
          for ( let i = 0 ; i < Object.keys(pat.globals).length ; i ++ ){
            if ( !Box.isProtectedKey(Object.keys(pat.globals)[i])){
              globals.push({
                key: Object.keys(pat.globals)[i],
                value: Object.values(pat.globals)[i]
              });
            }
          }
          self.patterns.push(
            {
              key: pat.key,
              instanciables: instanciables,
              globals: globals
            }
          );
        }

      });
    }
  }
  updatePattern(pattern, key, type, value) {
    Net.socket.emit('updatePattern', pattern.key, key, value, type, function(res) {});
  }


}
