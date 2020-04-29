export class Box{

  static lastUpdate = new Date().getTime() ;


  static BOXES = [];

  static PROTECTED_KEYS = [
    'id',
    'key',
    'x',
    'y'
  ];


  static isProtectedKey(key){
    let isProtected = false ;
    for ( let pk of Box.PROTECTED_KEYS ){
      if ( pk == key ){
        isProtected = true ;
        break ;
      }
    }
    return isProtected;
  }
  static isInPositionOf(key, x, y){
    let bool = false ;
    for ( let box of Box.BOXES ){
      if ( box.key == key && box.x == x && box.y == y ){
        bool = true ;
        break ;
      }
    }
    return bool ;
  }
  static isGround(key){
    if ( key == "ground" || key == "neutral" || key == "field" || key == "well" || key == "tree" || key == "temple"){
      return true ;
    }else{
      return false ;
    }
  }
  static isResource(key){
    if ( key == "food" || key == "water" || key == "material" || key == "faith" ){
      return true ;
    }else{
      return false;
    }
  }
  static isSolid(key){
    if ( key == "field" || key == "well" || key == "tree" || key == "temple" ){
      return true ;
    }else{
      return false;
    }
  }
  static isSpell(key){
    if ( key == "flame" || key == "levitation" ){
      return true ;
    }else{
      return false ;
    }
  }
  static gotSolidInPosition(x,y){
    let bool = false ;
    for ( let box of Box.BOXES ){
      if ( 'x' in box && box.x == x && box.y == y && Box.isSolid(box.key) ){
        bool = true ;
        break ;
      }
    }
    return bool ;
  }

  static reset(){
    while ( Box.BOXES.length > 0 ){
      Box.BOXES.splice(0,1);
    }
  }
  static adds(boxesJson, callBack){
    for ( let box of boxesJson ){
        Box.BOXES.push(box);
    }
    callBack(boxesJson);
  }
  static addItem(instruction){
    for ( let box of Box.BOXES ){
      if ( box.id == instruction.user ){
        if ( box['items'] ){
          box['items'].push(instruction.item) ;
        }else{
          box['items'] = [instruction.item] ;
        }
      }
    }
  }

  static readById(id){
    let box = null ;
    for ( let b of Box.BOXES ){
      if ( 'id' in  b && b.id == id ){
        box = b ;
        break ;
      }
    }
    return box ;
  }

  static updateValues(array){

    for ( let keyVal of array ){
      for ( let box of Box.BOXES ){
        if ( 'id' in box && box.id == keyVal.id ){
          box[keyVal.key] = keyVal.value ;
        }
      }
    }
  }
  static updatePositions(array, callBack){
    let updateds = [] ;
    for ( let keyVal of array ){
      let found = false ;
      for ( let box of Box.BOXES ){
        if ( 'id' in box && box.id == keyVal.id ){
          box.x = keyVal.x ;
          box.y = keyVal.y ;
          updateds.push(box);
          found = true ;
        }
      }
      if ( !found ){
        keyVal.state = "notfound";
        updateds.push(keyVal);
      }
    }
    callBack(updateds);
  }

  static removeByPosition(x,y){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'x' in box && 'y'in box && box.x == x && box.y == y ){
        Box.BOXES.splice(i, 1);
      }
    }
  }
  static removeById(id){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'id' in box && box.id == id ){
        Box.BOXES.splice(i, 1);
      }
    }
  }
  static removeByIds(ids){
    for ( let id of ids ){
      Box.removeById(id);
    }
  }

  constructor(){}

}
