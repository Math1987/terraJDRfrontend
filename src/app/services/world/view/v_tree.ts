import {View} from './view';
import {Box} from '../model/box';

export class V_tree extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_tree.image = new Image() ;
    V_tree.image.addEventListener('load', function(res) {});
    V_tree.image.src = `${View.SRC_IMAGE}/v_tree.png`;
  }
  readKey(){
    return 'tree';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_tree();
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
    return V_tree.image ;
  }
  getZ(): number {
    return 2;
  }

}
