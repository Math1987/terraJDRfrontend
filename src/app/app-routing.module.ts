import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {NavComponent} from './nav/nav.component';
import {AdminComponent} from './admin/admin.component';
import {MapComponent} from './game/map/map.component';


const routes: Routes = [

  {path:"login", component: LoginComponent},
  {path:"u", component: NavComponent, children:[
      {path:"", component:GameComponent},
      {path:"admin", component:AdminComponent},
      {path:"jeu", component:GameComponent, children:[
          {path:"carte", component:MapComponent}
        ]}
    ]},
  {path:"**", redirectTo:"login", pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
