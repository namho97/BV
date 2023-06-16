import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhomThuocComponent } from './nhom-thuoc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhomThuocRoutingModule } from './nhom-thuoc-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhomThuocService } from './nhom-thuoc.service';
import { BaseService } from 'src/app/core/services/base.service';
import { NhomThuocChiTietModule } from './nhom-thuoc-chi-tiet/nhom-thuoc-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NhomThuocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhomThuocChiTietModule
  ],
  declarations: [NhomThuocComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhomThuocService,
    { provide:BaseService, useClass:NhomThuocService }
  ],
})
export class NhomThuocModule { }
