import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinappticRoutingModule } from './sinapptic-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SinappticRoutingModule,
    FullCalendarModule
  ]
})
export class SinappticModule { }
