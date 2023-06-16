import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenhVienComponent } from './benh-vien.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseService } from 'src/app/core/services/base.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BenhVienChiTietModule } from './benh-vien-chi-tiet/benh-vien-chi-tiet.module';
import { BenhVienService } from './benh-vien.service';
import { BenhVienRoutingModule } from './benh-vien-routing.module';

@NgModule({
  imports: [
    CommonModule,
    BenhVienRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    BenhVienChiTietModule
  ],
  declarations: [BenhVienComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    BenhVienService,
    { provide:BaseService, useClass:BenhVienService }
  ]
})
export class BenhVienModule { }
