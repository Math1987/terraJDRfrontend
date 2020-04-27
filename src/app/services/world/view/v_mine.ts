import {View} from './view';
import {Box} from '../model/box';

export class V_mine extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_mine.image = new Image() ;
    V_mine.image.addEventListener('load', function(res) {});
    V_mine.image.src = `${View.SRC_IMAGE}/f_mine.png`;
  }
  readKey(){
    return 'mine';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_mine();
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
    return V_mine.image ;
  }
  getZ(){
    return 1 ;
  }

}
