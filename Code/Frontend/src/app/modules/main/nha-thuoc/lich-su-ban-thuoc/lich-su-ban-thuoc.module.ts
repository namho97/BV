import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuBanThuocComponent } from './lich-su-ban-thuoc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuBanThuocRoutingModule } from './lich-su-ban-thuoc-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuBanThuocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LichSuBanThuocComponent]
})
export class LichSuBanThuocModule { }
