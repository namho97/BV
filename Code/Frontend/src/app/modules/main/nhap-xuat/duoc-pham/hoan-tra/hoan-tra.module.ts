import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoanTraComponent } from './hoan-tra.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HoanTraRoutingModule } from './hoan-tra-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HoanTraRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [HoanTraComponent]
})
export class HoanTraModule { }
