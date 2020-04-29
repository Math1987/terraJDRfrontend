import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Box} from '../../services/world/model/box';
import {Net} from '../../services/net';
import {Controls} from '../../services/world/controls/controls';
import {NavComponent} from '../../nav/nav.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  static lastUpdate = new Date().getTime();
  skills = [];

  constructor() {
    CharacterComponent.lastUpdate = 0 ;
    this.updates();
  }

  ngOnInit() {

    const self = this ;
    NavComponent.functionInit = function() {
      CharacterComponent.lastUpdate = 0 ;
      self.updates();
    };
  }
  updates(){
    if ( Area.character !== null && Box.lastUpdate !== CharacterComponent.lastUpdate ){

      this.skills = [] ;
      for ( let i = 0 ; i < Object.keys(Area.character).length ; i ++ ){
        let key = Object.keys(Area.character)[i];
        let skill = Controls.getSkillFromKey( Object.keys(Area.character)[i]);
        if ( skill ){
          this.skills.push({
            key : key,
            value : Object.values(Area.character)[i],
            nom : skill.nom
          });
        }

      }
      CharacterComponent.lastUpdate = Box.lastUpdate ;
    }
    return true;
  }
  getXp(){
    if ( Area.character && 'xp' in Area.character){
      return Area.character.xp ;
    }else{
      return 0 ;
    }
  }
  addSkill(skill){
    Net.emitAction( 'addSkill', {
      user: Area.character,
      skill: skill.key,
      value : 1
    }, function(res) {

    });
  }

}
