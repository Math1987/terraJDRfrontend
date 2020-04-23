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
    if (this.getWorld()) {

      let charas = [];
      for (let chara of Characters.characters) {
        if (chara.world == this.getWorld().name) {
          charas.push(chara);
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

  create() {

    const self = this;

    let name = (document.getElementById("createName") as HTMLInputElement).value;
    let sexe = null;
    let race = null;

    for (let i = 0; i < 2; i++) {
      if (document.forms.namedItem("sexe").checker[i].checked == true) {
        sexe = document.forms.namedItem("sexe").checker[i].value;
      }
    }
    for (let i = 0; i < document.forms.namedItem("race").checker.length; i++) {
      if (document.forms.namedItem("race").checker[i].checked == true) {
        race = document.forms.namedItem("race").checker[i].value;
      }
    }

    if (name.length > 2) {
      Net.socket.emit('createUserCharacter', {
        key: "character",
        name: name,
        sexe: sexe,
        race: race
      }, function(createUserCharaRes) {

        Characters.add(createUserCharaRes);
        self.chooseCharacter(createUserCharaRes);

      });
    } else {
      alert('choisi un nom plus long.');
    }

  }
}