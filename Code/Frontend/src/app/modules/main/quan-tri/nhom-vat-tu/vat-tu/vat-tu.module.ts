import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatTuComponent } from './vat-tu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VatTuRoutingModule } from './vat-tu-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhomVatTuService } from '../nhom-vat-tu.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    VatTuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [VatTuComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhomVatTuService,
    { provide:BaseService, useClass:NhomVatTuService }
  ],
})
export class VatTuModule { }
