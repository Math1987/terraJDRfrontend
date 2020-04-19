import {View} from './view';
import {Box} from '../model/box';

export class V_ground extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_ground.image = new Image() ;
    V_ground.image.addEventListener('load', function(res) {});
    V_ground.image.src = `${View.SRC_IMAGE}/ground.png`;
  }
  readKey(){
    return 'ground';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_ground();
    instance.box = box ;
    return instance ;
  }

  getImage(){
    return V_ground.image ;
  }

}
