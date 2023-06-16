import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DichVuKyThuatComponent } from './dich-vu-ky-thuat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DichVuKyThuatRoutingModule } from './dich-vu-ky-thuat-routing.module';
import { DichVuKyThuatChiTietModule } from './dich-vu-ky-thuat-chi-tiet/dich-vu-ky-thuat-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DichVuKyThuatService } from './dich-vu-ky-thuat.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    DichVuKyThuatRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DichVuKyThuatChiTietModule
  ],
  declarations: [DichVuKyThuatComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DichVuKyThuatService,
    { provide:BaseService, useClass:DichVuKyThuatService }
  ]
})
export class DichVuKyThuatModule { }
