import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhomDichVuComponent } from './nhom-dich-vu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhomDichVuRoutingModule } from './nhom-dich-vu-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhomDichVuService } from './nhom-dich-vu.service';
import { BaseService } from 'src/app/core/services/base.service';
import { NhomDichVuChiTietModule } from './nhom-dich-vu-chi-tiet/nhom-dich-vu-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NhomDichVuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhomDichVuChiTietModule
  ],
  declarations: [NhomDichVuComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhomDichVuService,
    { provide:BaseService, useClass:NhomDichVuService }
  ]
})
export class NhomDichVuModule { }
