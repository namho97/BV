import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThietBiXetNghiemComponent } from './thiet-bi-xet-nghiem.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThietBiXetNghiemRoutingModule } from './thiet-bi-xet-nghiem-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThietBiXetNghiemRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ThietBiXetNghiemComponent]
})
export class ThietBiXetNghiemModule { }
