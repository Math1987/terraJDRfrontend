import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Box} from '../../services/world/model/box';
import {Net} from '../../services/net';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  static lastCharacterUpdate = new Date().getTime();
  skills = [];

  constructor() { }

  ngOnInit() {
  }
  updates(){
    if ( Area.character !== null && Area.lastCharacterUpdate !== CharacterComponent.lastCharacterUpdate ){
      Area.lastCharacterUpdate = CharacterComponent.lastCharacterUpdate ;

      this.skills = [] ;
      for ( let i = 0 ; i < Object.keys(Area.character).length ; i ++ ){
        let key = Object.keys(Area.character)[i];
        let skill = Box.getSkillFromKey( Object.keys(Area.character)[i]);
        if ( skill ){
          this.skills.push({
            key : key,
            value : Object.values(Area.character)[i],
            nom : skill.nom
          });
        }

      }
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
    Net.socket.emit('action', 'addSkill', {
      user: Area.character,
      skill: skill.key,
      value : 1
    }, function(res) {

    });
  }

}
