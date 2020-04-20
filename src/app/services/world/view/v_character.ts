import {View} from './view';
import {Box} from '../model/box';

export class V_character extends View{

  static image_human ;
  static image_human_female ;
  static image_dwarf ;
  static image_dwarf_female ;
  static image_vampire ;
  static image_vampire_female ;
  static image_elf ;
  static image_elf_female ;

  constructor(){
    super();
  }
  init_(){
    V_character.image_human = new Image() ;
    V_character.image_human.addEventListener('load', function(res) {});
    V_character.image_human.src = `${View.SRC_IMAGE}/human_man.png`;
    V_character.image_human_female = new Image() ;
    V_character.image_human_female.addEventListener('load', function(res) {});
    V_character.image_human_female.src = `${View.SRC_IMAGE}/human_woman.png`;


    V_character.image_dwarf = new Image() ;
    V_character.image_dwarf.addEventListener('load', function(res) {});
    V_character.image_dwarf.src = `${View.SRC_IMAGE}/dwarf_man.png`;
    V_character.image_dwarf_female = new Image() ;
    V_character.image_dwarf_female.addEventListener('load', function(res) {});
    V_character.image_dwarf_female.src = `${View.SRC_IMAGE}/dwarf_woman.png`;

    V_character.image_vampire = new Image() ;
    V_character.image_vampire.addEventListener('load', function(res) {});
    V_character.image_vampire.src = `${View.SRC_IMAGE}/vampire_man.png`;
    V_character.image_vampire_female = new Image() ;
    V_character.image_vampire_female.addEventListener('load', function(res) {});
    V_character.image_vampire_female.src = `${View.SRC_IMAGE}/vampire_woman.png`;

    V_character.image_elf = new Image() ;
    V_character.image_elf.addEventListener('load', function(res) {});
    V_character.image_elf.src = `${View.SRC_IMAGE}/elf_man.png`;
    V_character.image_elf_female = new Image() ;
    V_character.image_elf_female.addEventListener('load', function(res) {});
    V_character.image_elf_female.src = `${View.SRC_IMAGE}/elf_woman.png`;
  }
  readKey(){
    return 'character';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_character();
    instance.box = box ;
    return instance ;
  }

  getImage(){
    if ( 'race' in this.box && this.box.race === "human" ){
      if ( 'sexe' in this.box && this.box.sexe === "Féminin" ){
        return V_character.image_human_female ;
      }else{
        return V_character.image_human ;
      }
    }else if ( 'race' in this.box && this.box.race === "dwarf" ){
      if ( 'sexe' in this.box && this.box.sexe == "Féminin" ) {
        return V_character.image_dwarf_female;
      }else{
        return V_character.image_dwarf;
      }
    }else if ( 'race' in this.box && this.box.race === "vampire" ){
      if ( 'sexe' in this.box && this.box.sexe === "Féminin" ) {
        return V_character.image_vampire_female;
      }else{
        return V_character.image_vampire;
      }
    }else if ( 'race' in this.box && this.box.race === "elf" ){
      if ( 'sexe' in this.box && this.box.sexe === "Féminin" ) {
        return V_character.image_elf_female;
      }else{
        return V_character.image_elf;
      }
    }else{
      return V_character.image_human;
    }

  }
  getZ(): number {
    return 2;
  }

}
