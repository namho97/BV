import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuThuThuatComponent } from './lich-su-thu-thuat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuThuThuatRoutingModule } from './lich-su-thu-thuat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuThuThuatRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LichSuThuThuatComponent]
})
export class LichSuThuThuatModule { }
