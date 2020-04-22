import {T_attack} from './translator/t_attack';
import {Translator} from './translator/translator';
import {T_die} from './translator/t_die';
import {T_attack_counter} from './translator/t_attack_counter';
import {T_heal} from './translator/t_heal';
import {T_getFood} from './translator/t_getFood';
import {T_getWater} from './translator/t_getWater';

export class Model{

  static init(){
    Translator.init([
      new T_attack(),
      new T_attack_counter(),
      new T_die(),
      new T_heal(),
      new T_getFood(),
      new T_getWater()
    ]);
  }

}
