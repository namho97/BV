import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoaPhongComponent } from './khoa-phong.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KhoaPhongRoutingModule } from './khoa-phong-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { KhoaPhongService } from './khoa-phong.service';
import { BaseService } from 'src/app/core/services/base.service';
import { KhoaPhongChiTietModule } from './khoa-phong-chi-tiet/khoa-phong-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    KhoaPhongRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    KhoaPhongChiTietModule
  ],
  declarations: [KhoaPhongComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    KhoaPhongService,
    { provide:BaseService, useClass:KhoaPhongService }
  ],
})
export class KhoaPhongModule { }
