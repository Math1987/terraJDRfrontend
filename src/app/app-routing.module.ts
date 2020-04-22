import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {NavComponent} from './nav/nav.component';
import {AdminComponent} from './admin/admin.component';
import {MapComponent} from './game/map/map.component';
import {CharacterComponent} from './game/character/character.component';
import {Worlds} from './services/worlds';
import {WorldsComponent} from './game/worlds/worlds.component';
import {AdminMapComponent} from './admin/admin-map/admin-map.component';
import {PatternsComponent} from './admin/patterns/patterns.component';
import {CalculationComponent} from './admin/calculation/calculation.component';
import {RankingComponent} from './game/ranking/ranking.component';
import {MartyrComponent} from './game/ranking/martyr/martyr.component';


const routes: Routes = [

  {path:"login", component: LoginComponent},
  {path:"u", component: NavComponent, children:[
      {path:"", component:GameComponent},
      {path:"admin", component:AdminComponent, children:[
          {path:"carte", component: AdminMapComponent},
          {path:"models", component: PatternsComponent},
          {path:"calculs", component: CalculationComponent},
        ]},
      {path:"jeu", component:GameComponent, children:[
          {path:"", component:WorldsComponent},
          {path:"mondes", component:WorldsComponent},
          {path:"carte", component:MapComponent},
          {path:"perso", component:CharacterComponent},
          {path:"classement", component:RankingComponent, children:[
              {path:"martyr", component:MartyrComponent}
            ]},
        ]}
    ]},
  {path:"**", redirectTo:"login", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
