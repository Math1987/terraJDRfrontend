import {Net} from '../net';
import {Account} from '../account';


export class Area{

  static world = null ;
  static character = null ;

  static init(){

    if ( localStorage.getItem("world")){
      Area.world = JSON.parse(localStorage.getItem("world")) ;
      if ( localStorage.getItem("character")){
        Area.character = JSON.parse(localStorage.getItem("character")) ;
      }
    }
  }
  static reset(){
    Area.world = null ;
    Area.leaveWorld();
    Area.leaveCharacter();
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
    localStorage.setItem("character", JSON.stringify(character));
  }
  static leaveCharacter(){
    Area.character = null ;
    localStorage.removeItem("character");
  }

}
