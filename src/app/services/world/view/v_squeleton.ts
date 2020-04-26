import {View} from './view';
import {Box} from '../model/box';

export class V_squeleton extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_squeleton.image = new Image() ;
    V_squeleton.image.addEventListener('load', function(res) {});
    V_squeleton.image.src = `${View.SRC_IMAGE}/squeleton.png`;
  }
  readKey(){
    return 'squeleton';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_squeleton();
    instance.box = box ;
    return instance ;
  }

  getImage(){
    return V_squeleton.image ;
  }
  getZ(): number {
    return 2;
  }

}
