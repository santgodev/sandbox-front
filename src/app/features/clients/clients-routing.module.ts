import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClietsListComponent } from './cliets-list/cliets-list.component';
import { UserClientComponent } from './user-client/user-client.component';
import { AssetComponent } from './asset/asset.component';

const routes: Routes = [
  {path:'',component:ClietsListComponent},
  {path:'usuarios',component:UserClientComponent},  
  {path:'activos',component:AssetComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
