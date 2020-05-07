import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavComponent} from '../../nav/nav.component';
import {Area} from '../../services/world/area';
import {Worlds} from '../../services/worlds';
import {Characters} from '../../services/characters';
import {Net} from '../../services/net';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss']
})
export class WorldsComponent implements OnInit {

  static initialized = false;

  race = 'human' ;
  religion = 'hermes';

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

  setRace(obj){}

  /**
   * Creates character
   */
  createCharacter(){
    const
      form = <HTMLFormElement> document.getElementById('character-creation');
      let formData = new FormData(form);

    if(formData.get('charName').toString().length > 2){
      Net.emitCreateCharacter({
        key: "character",
        name: formData.get('charName'),
        sexe: formData.get('gender'),
        race: this.race,
        religion: this.religion
      }, (createUserCharaRes) => {
        Characters.add(createUserCharaRes);
        this.chooseCharacter(createUserCharaRes);
      });
    }else{
      alert('Choisis un nom plus long.');
    }
  }
}
