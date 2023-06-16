import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanThuocComponent } from './ban-thuoc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BanThuocRoutingModule } from './ban-thuoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BanThuocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [BanThuocComponent]
})
export class BanThuocModule { }
