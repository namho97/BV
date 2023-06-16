import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuThuVienPhiComponent } from './lich-su-thu-vien-phi.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuThuVienPhiRoutingModule } from './lich-su-thu-vien-phi-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuThuVienPhiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LichSuThuVienPhiComponent]
})
export class LichSuThuVienPhiModule { }
