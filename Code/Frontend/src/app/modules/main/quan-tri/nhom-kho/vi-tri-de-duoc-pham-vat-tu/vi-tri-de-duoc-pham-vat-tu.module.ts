import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViTriDeDuocPhamVatTuComponent } from './vi-tri-de-duoc-pham-vat-tu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViTriDeDuocPhamVatTuRoutingModule } from './vi-tri-de-duoc-pham-vat-tu-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ViTriDuocPhamVatTuService } from './vi-tri-duoc-pham-vat-tu.service';
import { BaseService } from 'src/app/core/services/base.service';
import { ViTriDeDuocPhamVatTuChiTietModule } from './vi-tri-de-duoc-pham-vat-tu-chi-tiet/vi-tri-de-duoc-pham-vat-tu-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    ViTriDeDuocPhamVatTuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ViTriDeDuocPhamVatTuChiTietModule
  ],
  declarations: [ViTriDeDuocPhamVatTuComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ViTriDuocPhamVatTuService,
    { provide:BaseService, useClass:ViTriDuocPhamVatTuService }
  ],
})
export class ViTriDeDuocPhamVatTuModule { }
