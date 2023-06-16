import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuocPhamComponent } from './duoc-pham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DuocPhamRoutingModule } from './duoc-pham-routing.module';
import { DuocPhamChiTietModule } from './duoc-pham-chi-tiet/duoc-pham-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { DuocPhamService } from './duoc-pham.service';

@NgModule({
  imports: [
    CommonModule,
    DuocPhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DuocPhamChiTietModule,
  ],
  declarations: [DuocPhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DuocPhamService,
    { provide:BaseService, useClass:DuocPhamService }
  ],
})
export class DuocPhamModule { }
