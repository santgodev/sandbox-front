import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidevavComponent } from './sidevav/sidevav.component';

const routes: Routes = [
  { path: '', component: SidevavComponent,children:[
    {
      path:'',
      loadChildren: () => import('../features/sinapptic/sinapptic.module').then(m => m.SinappticModule),
    },
    {
      path:'clientes',
      loadChildren: () => import('../features/clients/clients.module').then(m => m.ClientsModule),
    }
  ]

  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
