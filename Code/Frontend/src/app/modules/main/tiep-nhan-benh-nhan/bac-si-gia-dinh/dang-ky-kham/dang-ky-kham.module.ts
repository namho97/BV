import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DangKyKhamComponent } from './dang-ky-kham.component';
import { DangKyKhamRoutingModule } from './dang-ky-kham-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DangKyKhamChiTietModule } from './dang-ky-kham-chi-tiet/dang-ky-kham-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { DangKyKhamService } from './dang-ky-kham.service';

@NgModule({
  imports: [
    CommonModule,
    DangKyKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DangKyKhamChiTietModule
  ],
  declarations: [DangKyKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DangKyKhamService,
    { provide:BaseService, useClass:DangKyKhamService }
  ]
})
export class DangKyKhamModule { }
