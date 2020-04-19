import {View} from './view';
import {Box} from '../model/box';

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
  createInstance(box:Box){
    let instance = new V_character();
    instance.box = box ;
    return instance ;
  }

  getImage(){
    return V_character.image ;
  }
  getZ(): number {
    return 2;
  }

}
