import {View} from './view';
import {Box} from '../model/box';

export class V_temple extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_temple.image = new Image() ;
    V_temple.image.addEventListener('load', function(res) {});
    V_temple.image.src = `${View.SRC_IMAGE}/b_temple.png`;
  }
  readKey(){
    return 'temple';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_temple();
    instance.box = box ;
    return instance ;
  }
  fusionWith(view: View){
    if ( Box.isGround(view.box.key) ){
      return true ;
    }else{
      return false ;
    }
  }

  getImage(){
    return V_temple.image ;
  }
  getZ(): number {
    return 2;
  }

}
