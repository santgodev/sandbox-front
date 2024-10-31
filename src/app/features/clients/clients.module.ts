import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRow, MatTableModule } from '@angular/material/table';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClietsListComponent } from './cliets-list/cliets-list.component';
import { MaterialModule } from '../../material.module';
import { ClientFormComponent } from './client-form/client-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { UserClientComponent } from './user-client/user-client.component';
import { UserClientFormComponent } from './user-client-form/user-client-form.component';
import { AssetComponent } from './asset/asset.component';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ClietsListComponent,
    ClientFormComponent,
    UserClientComponent,
    UserClientFormComponent,
    AssetComponent,
    AssetFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    MaterialModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRow,
    FormsModule,
    MatAutocompleteModule,
  ]
})
export class ClientsModule { }
