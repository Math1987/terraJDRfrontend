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
          let vals = [] ;
          for ( let i = 0 ; i < Object.keys(pat).length ; i ++ ){
            if ( !Box.isProtectedKey(Object.keys(pat)[i])){
              vals.push({
                key: Object.keys(pat)[i],
                value: Object.values(pat)[i]
              });
            }
          }
          self.patterns.push(
            {
              key: pat.key,
              array: vals
            }
          );
        }

      });
    }
  }
  updatePattern(pattern, key, value) {
    Net.socket.emit('updatePattern', pattern.key, key, value, function(res) {});
  }


}
