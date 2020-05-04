import { Component, OnInit } from '@angular/core';
import {Area} from '../../services/world/area';
import {Box} from '../../services/world/model/box';
import {Net} from '../../services/net';
import {Controls} from '../../services/world/controls/controls';
import {NavComponent} from '../../nav/nav.component';
import {Action} from '../../services/world/controls/actions/action';
import {V_fortification} from '../../services/world/view/v_fortification';
import {Translator} from '../../services/world/model/translator/translator';
import {MessageComponent} from '../message/message.component';
import {HistoricComponent} from '../historic/historic.component';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  static lastUpdate = new Date().getTime();
  skills = [];
  spells = [] ;
  fortifications = [] ;

  constructor() {

    const self = this ;
    NavComponent.functionInit = function() {
      HistoricComponent.init();
      CharacterComponent.lastUpdate = 0 ;
      self.updates();
    };

    CharacterComponent.lastUpdate = 0 ;
    this.updates();
  }

  ngOnInit() {


  }
  updates(){
    const self = this ;
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


      this.spells = [] ;

      for ( let spell of Action.getSpells() ){
        if ( 'religions' in spell ){
          let canAdd = false ;
          for ( let religion of spell.religions ){
            if ( Area.character && religion == Area.character.religion ){
              canAdd = true ;
            }
          }
          if ( canAdd ){
            this.spells.push(spell);
          }
        }else{
          this.spells.push(spell);
        }
      }

      if ( Area.character && Area.character.fortifications ) {
        self.fortifications = [];
        Net.emitReadByIds(Area.character.fortifications, function(objs){
          self.fortifications = objs ;
        });
      }


      CharacterComponent.lastUpdate = Box.lastUpdate ;
    }

    for ( let fort of this.fortifications ){
      let canvas = document.getElementById(fort.id) as HTMLCanvasElement ;
      if (canvas){
        canvas.width = 128 ;
        canvas.height = 128 ;
        canvas.style.width = `${canvas.width}px`;
        canvas.style.height = `${canvas.height}px` ;
        let context = canvas.getContext("2d");
        context.fillStyle = "gray" ;
        context.drawImage( V_fortification.image,0,0, canvas.width, canvas.width);
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
  getReligion(){
    if ( Area.character ){
      return Area.character.religion ;
    }else{
      return '';
    }

  }
  getSpellNom(key){
    return Translator.translate(key, 'fr', 'default');
  }
  getSpells(){
    return this.spells ;
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
