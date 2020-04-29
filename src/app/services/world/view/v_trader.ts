import {View} from './view';
import {Box} from '../model/box';

export class V_trader extends View{

  static image ;

  constructor(){
    super();
  }
  init_(){
    V_trader.image = new Image() ;
    V_trader.image.addEventListener('load', function(res) {});
    V_trader.image.src = `${View.SRC_IMAGE}/b_seller.png`;
  }
  readKey(){
    return 'trader';
  }
  init(){}
  createInstance(box:Box){
    let instance = new V_trader();
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
    return V_trader.image ;
  }
  getZ(): number {
    return 2;
  }

}
