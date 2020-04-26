import {View} from './view';
import {Box} from '../model/box';

export class V_well extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_well.image = new Image() ;
    V_well.image.addEventListener('load', function(res) {});
    V_well.image.src = `${View.SRC_IMAGE}/b_well.png`;
  }
  readKey(){
    return 'well';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_well();
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
    return V_well.image ;
  }
  getZ(){
    return 1 ;
  }

}
