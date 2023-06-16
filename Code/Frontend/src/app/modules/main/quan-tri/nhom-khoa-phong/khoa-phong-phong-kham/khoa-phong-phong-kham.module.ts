import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoaPhongPhongKhamComponent } from './khoa-phong-phong-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KhoaPhongPhongKhamRoutingModule } from './khoa-phong-phong-kham-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { KhoaPhongPhongKhamService } from './khoa-phong-phong-kham.service';
import { BaseService } from 'src/app/core/services/base.service';
import { KhoaPhongPhongKhamChiTietModule } from './khoa-phong-phong-kham-chi-tiet/khoa-phong-phong-kham-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    KhoaPhongPhongKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    KhoaPhongPhongKhamChiTietModule
  ],
  declarations: [KhoaPhongPhongKhamComponent]
  ,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    KhoaPhongPhongKhamService,
    { provide:BaseService, useClass:KhoaPhongPhongKhamService }
  ],
})
export class KhoaPhongPhongKhamModule { }
