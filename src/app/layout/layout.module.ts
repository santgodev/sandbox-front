import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SidevavComponent } from './sidevav/sidevav.component';
import { MaterialModule } from '../material.module';
import { DialogCustomComponent } from '../shared/dialog-custom/dialog-custom.component';


@NgModule({
  declarations: [
    SidevavComponent,
    DialogCustomComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
  ]
})
export class LayoutModule { }
