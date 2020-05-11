import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Area} from '../../services/world/area';
import {Worlds} from '../../services/worlds';
import {Characters} from '../../services/characters';
import {Net} from '../../services/net';
import {Translator} from '../../services/world/model/translator/translator';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss']
})
export class WorldsComponent implements OnInit {

  static initialized = false;

  gender: string;
  name: string = '';
  race: string = 'human' ;
  religion: string = 'hermes';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {

    NavComponent.setInitCallBack(function(worlds) {
      WorldsComponent.initialized = true;
    });
  }

  isInitialized() {
    return WorldsComponent.initialized;
  }

  getWorlds() {
    return Worlds.worlds;
  }

  getWorld() {
    return Area.world;
  }
  getSexes(){
    return Translator.METADATAS['sexes'];
  }
  getRaces(){
    return Translator.METADATAS['races'] ;
  }
  getReligions(){
    return Translator.METADATAS['religions'];
  }

  getCharacters() {
    if ( this.getWorld() ) {
      let charas = [];
      if ( Characters.characters ){
        for (let chara of Characters.characters) {
          if (chara.world == this.getWorld().name) {
            charas.push(chara);
          }
        }
      }
      return charas;

    } else {
      return [];
    }
  }

  getCharacter() {
    return Area.character;
  }

  enterInWorld(world) {
    Worlds.enterIn(world, function(res) {

    });
  }

  chooseCharacter(character) {

    Area.setCharacter(character);
    this.router.navigate(['u/jeu/carte']);//, { relativeTo: this.router });

  }

  isFocus(world) {
    if (Area.world !== null && world.name === Area.world.name) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets race
   * @param race
   */
  setRace(race: string){
    this.race = race;
  }

  /**
   * Sets gender
   * @param {String} gender
   */
  setGender(gender: string){
    this.gender = gender;
  }

  /**
   * Sets religion
   * @param religion
   */
  setReligion(religion: string){
    this.religion = religion;
  }

  /**
   * Sets name
   * @param name
   */
  setName(name: string){
    this.name = name;
  }

  /**
   * Creates character
   */
  createCharacter(){
    console.log(this.name);
    if(this.name.length > 2){
      Net.emitCreateCharacter({
        key: "character",
        name: this.name,
        sexe: this.gender,
        race: this.race,
        religion: this.religion
      }, (createUserCharaRes) => {
        if ( createUserCharaRes){
          Characters.add(createUserCharaRes);
          this.chooseCharacter(createUserCharaRes);
        }else{
          alert(`Ce pseudo est déjà utilisé.`);
        }
      });
    }else{
      alert('Choisis un nom plus long.');
    }
  }
}
