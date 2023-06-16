import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChanDoanComponent } from './chan-doan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChanDoanRoutingModule } from './chan-doan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChanDoanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ChanDoanComponent]
})
export class ChanDoanModule { }
