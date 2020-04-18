import {View} from './view';

export class V_character extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_character.image = new Image() ;
    V_character.image.addEventListener('load', function(res) {});
    V_character.image.src = `${View.SRC_IMAGE}/human_man.png`;
  }
  readKey(){
    return 'character';
  }
  init(){}

  getImage(){
    return V_character.image ;
  }
  getZ(): number {
    return 2;
  }

}
