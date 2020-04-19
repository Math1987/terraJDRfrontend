import {Net} from '../net';
import {Account} from '../account';
import {environment} from '../../../environments/environment';


export class Area{

  static world = null ;
  static character = null ;

  static init(){

    if ( localStorage.getItem("world")){
      Area.world = JSON.parse(localStorage.getItem("world")) ;
      if ( localStorage.getItem("character")){
        let chara = JSON.parse(localStorage.getItem("character"));
        Net.http.get(`${environment.backURL}/readById?world=${Area.world.name}&id=${chara.id}`,
          {responseType:"json", headers: Net.headers}).subscribe((res)=>{
            console.log(res) ;
            if ( res !== null ){
              Area.character = res ;
            }
        });
      }
    }
  }
  static reset(){
    Area.world = null ;
    Area.leaveWorld();
    Area.leaveCharacter();
  }
  static updateValues(array){
    for ( let keyVal of array ){
      if ( keyVal.id == Area.character.id ){
        Area.character[keyVal.key] = keyVal.value ;
      }
    }
  }
  static updatePositions(array){
    for ( let keyVal of array ){
      if ( keyVal.id == Area.character.id ){
        Area.character.x = keyVal.x ;
        Area.character.y = keyVal.y ;
      }
    }
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
