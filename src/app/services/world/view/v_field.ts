import {View} from './view';
import {Box} from '../model/box';

export class V_field extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_field.image = new Image() ;
    V_field.image.addEventListener('load', function(res) {});
    V_field.image.src = `${View.SRC_IMAGE}/v_field.png`;
  }
  readKey(){
    return 'field';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_field();
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
    return V_field.image ;
  }
  getZ(){
    return 1 ;
  }

}
