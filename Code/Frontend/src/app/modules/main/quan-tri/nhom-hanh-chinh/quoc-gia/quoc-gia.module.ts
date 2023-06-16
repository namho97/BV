import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuocGiaComponent } from './quoc-gia.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuocGiaRoutingModule } from './quoc-gia-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { QuocGiaService } from './quoc-gia.service';
import { BaseService } from 'src/app/core/services/base.service';
import { QuocGiaChiTietModule } from '../quoc-gia/quoc-gia-chi-tiet/quoc-gia-chi-tiet.module';
@NgModule({
  imports: [
    CommonModule,
    QuocGiaRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    QuocGiaChiTietModule
  ],
  declarations: [QuocGiaComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    QuocGiaService,
    { provide:BaseService, useClass:QuocGiaService }
  ],
})
export class QuocGiaModule { }
