import {View} from './view';
import {Box} from '../model/box';

export class V_fortification extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_fortification.image = new Image() ;
    V_fortification.image.addEventListener('load', function(res) {});
    V_fortification.image.src = `${View.SRC_IMAGE}/b_fortification.png`;
  }
  readKey(){
    return 'fortification';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_fortification();
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
    return V_fortification.image ;
  }
  getZ(): number {
    return 1 ;
  }

}
