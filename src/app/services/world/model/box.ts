export class Box{

  static PATTERNS = [] ;

  static BOXES = [];


  static adds(boxesJson, callBack){
    for ( let box of boxesJson ){
        Box.BOXES.push(box);
    }
    callBack(boxesJson);
  }
  static removeByPosition(x,y){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'x' in box && 'y'in box && box.x == x && box.y == y ){
        Box.BOXES.splice(i, 1);
      }
    }
  }


  constructor(){}

}
