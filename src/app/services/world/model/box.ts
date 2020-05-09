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
  static getByPosition(x,y){
    let objs = [] ;
    for ( let box of Box.BOXES ){
      if ( 'x' in box && box.x == x && box.y == y ){
        objs.push(box);
      }
    }
    return objs ;
  }
  static gotSameBox(newBox){
    let got = false ;
    for ( let box of Box.BOXES ){
      if ( box.id == newBox.id && (!('x' in box) || ( box.x == newBox.x && box.y == newBox.y)) ){
        got = true ;
        break ;
      }
    }
    return got ;
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
    if ( key == "food" || key == "water" || key == "material" || key == "faith" || key == "gold" ){
      return true ;
    }else{
      return false;
    }
  }
  static isSolid(key){
    if ( key == "field" || key == "well" || key == "tree" || key == "temple" || key == "trader" ){
      return true ;
    }else{
      return false;
    }
  }
  static isSpell(key){
    if ( key == "flame" || key == "levitation" || key == "protection" || key == "blesstree" || key == "luck" || key == "spellRain" || key == "spellVision"){
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
    /**
     * add an object in the user's view.
     * WARNING: this function is supposed to be called for only new Objects added.
     * For security and avoid to get duplicated objects, the function "gotSameBox(box)"
     * is called to check if box already exist.
     * This case is an error not yet localized. This solution cost performances and wait better option.
     **/
    for ( let box of boxesJson ){
      if ( !Box.gotSameBox(box) ){
        Box.BOXES.push(box);
      }
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
  static updateBox(boxToUpdate, model){
    for ( let key of Object.keys(model) ){

      boxToUpdate[key] = model[key] ;
    }
  }

  static removeByPosition(x,y){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'x' in box && 'y'in box && box.x == x && box.y == y ){
        Box.BOXES.splice(i, 1);
      }
    }
  }
  static removeValues(array){
    for ( let ar of array ){
      let obj = Box.readById(ar.id);
      if ( obj ){
        delete obj[ar.key];
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
