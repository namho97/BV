import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuDangKyKhamComponent } from './lich-su-dang-ky-kham.component';
import { LichSuDangKyKhamRoutingModule } from './lich-su-dang-ky-kham-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuDangKyKhamChiTietModule } from './lich-su-dang-ky-kham-chi-tiet/lich-su-dang-ky-kham-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { LichSuDangKyKhamService } from './lich-su-dang-ky-kham.service';

@NgModule({
  imports: [
    CommonModule,
    LichSuDangKyKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    LichSuDangKyKhamChiTietModule
  ],
  declarations: [LichSuDangKyKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    LichSuDangKyKhamService,
    { provide:BaseService, useClass:LichSuDangKyKhamService }
  ]
})
export class LichSuDangKyKhamModule { }
