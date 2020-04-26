import {Translator} from '../../../services/world/model/translator/translator';
import {View} from '../../../services/world/view/view';

export class Builder{

  static ID_BUILDER = 0 ;

  key ;
  id ;
  canvas ;
  views ;

  constructor(key:string){
    this.key = key ;
    this.id = "editAdd" + Builder.ID_BUILDER  ;
    Builder.ID_BUILDER ++ ;

    this.views = [View.build(this)];

  }
  getNom(){
    return Translator.translate(this.key, "fr", "default");
  }
  draw() {
    if (!this.canvas) {
      this.canvas = document.getElementById("" + this.id) as HTMLCanvasElement;
    }

    if (this.canvas) {
      this.canvas.width = 256;
      this.canvas.height = 256;
      this.canvas.style.width = "64px" ;
      this.canvas.style.height = "64px" ;
      let context = this.canvas.getContext('2d');
      context.translate(this.canvas.width / 2, this.canvas.height / 2);
      for (let z = 0; z < 3; z++) {
        for (let view of this.views) {
          if (view.getZ() == z) {
            view.draw(context, this.canvas.width);
          }
        }
      }

    }
    return true ;
  }

}
