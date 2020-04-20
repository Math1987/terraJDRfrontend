import {View} from './view';
import {Box} from '../model/box';

export class V_neutral extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_neutral.image = new Image() ;
    V_neutral.image.addEventListener('load', function(res) {});
    V_neutral.image.src = `${View.SRC_IMAGE}/g_neutral.png`;
  }
  readKey(){
    return 'neutral';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_neutral();
    instance.box = box ;
    return instance ;
  }

  getImage(){
    return V_neutral.image ;
  }

}
