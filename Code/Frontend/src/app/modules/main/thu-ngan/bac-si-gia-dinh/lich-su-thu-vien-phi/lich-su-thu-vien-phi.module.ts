import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuThuVienPhiComponent } from './lich-su-thu-vien-phi.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseService } from 'src/app/core/services/base.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuThuVienPhiChiTietModule } from './lich-su-thu-vien-phi-chi-tiet/lich-su-thu-vien-phi-chi-tiet.module';
import { LichSuThuVienPhiRoutingModule } from './lich-su-thu-vien-phi-routing.module';
import { LichSuThuVienPhiService } from './lich-su-thu-vien-phi.service';

@NgModule({
  imports: [
    CommonModule,
    LichSuThuVienPhiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    LichSuThuVienPhiChiTietModule
  ],
  declarations: [LichSuThuVienPhiComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    LichSuThuVienPhiService,
    { provide:BaseService, useClass:LichSuThuVienPhiService }
  ]
})
export class LichSuThuVienPhiModule { }
