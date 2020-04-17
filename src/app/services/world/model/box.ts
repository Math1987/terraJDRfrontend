export class Box{

  static PATTERNS = [] ;

  static BOXES = [];


  static adds(boxesJson, callBack){
    for ( let box of boxesJson ){
      Box.BOXES.push(box);
    }
    callBack(boxesJson);
  }


  constructor(){}

}
