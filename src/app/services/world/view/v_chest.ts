import {View} from './view';
import {Box} from '../model/box';

export class V_chest extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_chest.image = new Image() ;
    V_chest.image.addEventListener('load', function(res) {});
    V_chest.image.src = `${View.SRC_IMAGE}/f_strongbox.png`;
  }
  readKey(){
    return 'chest';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_chest();
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
    return V_chest.image ;
  }
  getZ(){
    return 1 ;
  }

}
