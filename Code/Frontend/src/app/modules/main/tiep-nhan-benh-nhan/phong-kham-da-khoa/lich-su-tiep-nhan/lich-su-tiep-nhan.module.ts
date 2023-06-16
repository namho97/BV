import { ChiTietLichSuTiepNhanModule } from './chi-tiet-lich-su-tiep-nhan/chi-tiet-lich-su-tiep-nhan.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuTiepNhanComponent } from './lich-su-tiep-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuTiepNhanRoutingModule } from './lich-su-tiep-nhan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuTiepNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ChiTietLichSuTiepNhanModule
  ],
  declarations: [LichSuTiepNhanComponent]
})
export class LichSuTiepNhanModule { }
