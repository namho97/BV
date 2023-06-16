import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiSoXetNghiemComponent } from './chi-so-xet-nghiem.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChiSoXetNghiemRoutingModule } from './chi-so-xet-nghiem-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ChiSoXetNghiemRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ChiSoXetNghiemComponent]
})
export class ChiSoXetNghiemModule { }
