import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhaSanXuatComponent } from './nha-san-xuat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhaSanXuatRoutingModule } from './nha-san-xuat-routing.module';
import { NhaSanXuatChiTietModule } from './nha-san-xuat-chi-tiet/nha-san-xuat-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhaSanXuatService } from './nha-san-xuat.service';
import { BaseService } from 'src/app/core/services/base.service';
@NgModule({
  imports: [
    CommonModule,
    NhaSanXuatRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhaSanXuatChiTietModule
  ],
  declarations: [NhaSanXuatComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhaSanXuatService,
    { provide:BaseService, useClass:NhaSanXuatService }
  ],
})
export class NhaSanXuatModule { }
