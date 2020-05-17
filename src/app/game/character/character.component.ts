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
  infos = [];
  skills = [];
  spells = [] ;
  fortifications = [] ;
  religionImagePath = '/assets/images/cat.png' ;

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

      console.log(Area.character);

      let fortifications =  null ;
      let reliques = null ;
      if ( this.infos.length <= 0 ) {
        for (let key of Object.keys(Area.character)) {
          if (key === "race") {
            this.infos.push(Translator.getMetaDataByKey(Area.character[key]).name_fr);
          }else if (key === "sexe") {
            this.infos.push(Translator.translate(Area.character[key], 'fr', 'default'));
          }else if (key === "fortifications") {
            this.infos.push(Translator.translate("fortification", 'fr', 'default'));
            fortifications = true ;
          }else if (key === "relics") {
            this.infos.push(Translator.translate("relic", 'fr', 'default'));
            reliques = true ;
          }
        }
      }

      if ( Area.character && Area.character.religion ){
        let path = Translator.getMetaDataByKey(Area.character.religion);
        if ( path ){
          console.log('path' + JSON.stringify(path));
          this.religionImagePath = path.img ;
        }
      }

      while (this.skills.length>0){
        this.skills.splice(0,1);
      }
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


      while ( this.spells.length > 0 ){
        this.spells.splice(0,1);
      }

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
      let rel = Area.character.religion ;
      for ( let religion of Translator.METADATAS['religions'] ){
        if ( religion.key == Area.character.religion ){
          rel = religion.name_fr ;
        }
      }
      return rel  ;
    }else{
      return '';
    }

  }
  getCharacter(){
    return Area.character ;
  }
  getSpellNom(key){
    return Translator.translate(key, 'fr', 'default');
  }
  getSkillNameFr(key){
    return Translator.translate(key, 'fr', 'skill');
  }
  getSpells(){
    return this.spells ;
  }
  canAddSkill = true ;
  addSkill(skill, add){
    const self = this ;
    if ( self.canAddSkill ){
      self.canAddSkill = false ;
      Net.emitAction( 'addSkill', {
        user: Area.character,
        skill: skill.key,
        value : add
      }, function(res) {
        self.canAddSkill = true ;
      });
    }

  }

  getInfos(){
    return this.infos ;
  }
  getReligionImagePath(){
    if ( this.religionImagePath ){
      return this.religionImagePath ;
    }else{
      return '/assets/images/cat.png' ;
    }
  }

}
