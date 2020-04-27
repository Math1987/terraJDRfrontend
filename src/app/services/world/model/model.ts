import {T_attack} from './translator/t_attack';
import {Translator} from './translator/translator';
import {T_die} from './translator/t_die';
import {T_attack_counter} from './translator/t_attack_counter';
import {T_heal} from './translator/t_heal';
import {T_getFood} from './translator/t_getFood';
import {T_getWater} from './translator/t_getWater';
import {T_life} from './translator/t_life';
import {T_water} from './translator/t_water';
import {T_food} from './translator/t_food';
import {T_material} from './translator/t_material';
import {T_faith} from './translator/t_faith';
import {T_ground} from './translator/t_ground';
import {T_neutral} from './translator/t_neutral';
import {T_defense} from './translator/t_defense';
import {T_giveResource} from './translator/t_giveResource';
import {T_getMaterial} from './translator/t_getMaterial';
import {T_getResource} from './translator/t_getResource';
import {T_field} from './translator/t_field';
import {T_getFaith} from './translator/t_getFaith';

export class Model{

  static init(){
    Translator.init([
      new T_ground(),
      new T_neutral(),
      new T_field(),
      new T_defense(),
      new T_attack(),
      new T_attack_counter(),
      new T_die(),
      new T_heal(),
      new T_getFood(),
      new T_getWater(),
      new T_getFood(),
      new T_getMaterial(),
      new T_getFaith(),
      new T_getResource(),
      new T_giveResource(),
      new T_life(),
      new T_water(),
      new T_food(),
      new T_material(),
      new T_faith()
    ]);
  }

}
