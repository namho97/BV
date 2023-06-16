import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuCdhaTdcnComponent } from './lich-su-cdha-tdcn.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuCdhaTdcnRoutingModule } from './lich-su-cdha-tdcn-routing.module';
import { LichSuCdhaChiTietModule } from './lich-su-cdha-chi-tiet/lich-su-cdha-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuCdhaTdcnRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    LichSuCdhaChiTietModule
  ],
  declarations: [LichSuCdhaTdcnComponent]
})
export class LichSuCdhaTdcnModule { }
