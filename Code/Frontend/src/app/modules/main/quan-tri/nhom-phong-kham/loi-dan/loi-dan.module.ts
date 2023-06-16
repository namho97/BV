import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoiDanComponent } from './loi-dan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoiDanRoutingModule } from './loi-dan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoiDanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LoiDanComponent]
})
export class LoiDanModule { }
