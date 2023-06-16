import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DichVuKhamComponent } from './dich-vu-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DichVuKhamRoutingModule } from './dich-vu-kham-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { DichVuKhamService } from './dich-vu-kham.service';
import { DichVuKhamChiTietModule } from './dich-vu-kham-chi-tiet/dich-vu-kham-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    DichVuKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DichVuKhamChiTietModule
  ],
  declarations: [DichVuKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DichVuKhamService,
    { provide:BaseService, useClass:DichVuKhamService }
  ]
})
export class DichVuKhamModule { }
