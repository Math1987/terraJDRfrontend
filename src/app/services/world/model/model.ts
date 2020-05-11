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
import {T_waterTree} from './translator/t_waterTree';
import {T_search} from './translator/t_search';
import {T_relic} from './translator/t_relic';
import {T_trade} from './translator/t_trade';
import {T_bewitch} from './translator/t_bewitch';
import {T_openchest} from './translator/t_openChest';
import {T_build} from './translator/t_build';
import {T_gold} from './translator/t_gold';
import {T_trader} from './translator/T_trader';
import {T_mine} from './translator/t_mine';
import {T_spellVision} from './translator/t_spellVision';
import {T_spellRain} from './translator/t_spellRain';
import {T_blesstree} from './translator/t_blesstree';
import {T_luck} from './translator/t_luck';
import {T_plantTree} from './translator/t_plantTree';
import {T_tree} from './translator/T_tree';
import {T_kill} from './translator/t_kill';
import {T_squeleton} from './translator/t_squeleton';
import {T_fortification} from './translator/t_fortification';
import {T_flame} from './translator/t_flame';
import {T_well} from './translator/t_well';

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
      new T_gold(),
      new T_getFaith(),
      new T_getResource(),
      new T_giveResource(),
      new T_waterTree(),
      new T_search(),
      new T_openchest(),
      new T_bewitch(),
      new T_life(),
      new T_water(),
      new T_food(),
      new T_material(),
      new T_faith(),
      new T_relic(),
      new T_trade(),
      new T_build(),
      new T_trader(),
      new T_mine(),
      new T_spellVision(),
      new T_spellRain(),
      new T_blesstree(),
      new T_luck(),
      new T_plantTree(),
      new T_tree(),
      new T_kill(),
      new T_squeleton(),
      new T_fortification(),
      new T_flame(),
      new T_well()
    ]);
  }

}
