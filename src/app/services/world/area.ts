import {Net} from '../net';
import {Account} from '../account';


export class Area{

  static world = null ;
  static character = null ;

  static init(){
    if ( localStorage.getItem("world")){
      Area.world = JSON.parse(localStorage.getItem("world")) ;
    }
  }
  static reset(){
    Area.world = null ;
    localStorage.removeItem("world");
  }

  static setWorld(world){
    localStorage.setItem("world", JSON.stringify(world));
    Area.world = world ;
  }
  static leaveWorld(){
    localStorage.removeItem("world");
    Area.world = null ;
  }
  static isWorldFocused(world){
    if ( Area.world !== null && Area.world.name == world.name ){
      return true ;
    }else{
      return false ;
    }
  }


  static setCharacter(character){
    Area.character = character ;
    localStorage.setItem("character", character);
  }
  static leaveCharacter(){
    Area.character = null ;
    localStorage.removeItem("character");
  }

}
