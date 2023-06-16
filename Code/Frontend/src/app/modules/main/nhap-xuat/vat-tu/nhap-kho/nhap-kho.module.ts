import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhapKhoComponent } from './nhap-kho.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhapKhoRoutingModule } from './nhap-kho-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NhapKhoRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [NhapKhoComponent]
})
export class NhapKhoModule { }
