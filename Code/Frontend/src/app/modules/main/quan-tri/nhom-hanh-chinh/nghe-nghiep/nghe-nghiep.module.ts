import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgheNghiepComponent } from './nghe-nghiep.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgheNghiepRoutingModule } from './nghe-nghiep-routing.module';
import { NgheNghiepChiTietModule } from './nghe-nghiep-chi-tiet/nghe-nghiep-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgheNghiepService } from './nghe-nghiep.service';
import { BaseService } from 'src/app/core/services/base.service';


@NgModule({
  imports: [
    CommonModule,
    NgheNghiepRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgheNghiepChiTietModule
  ],
  declarations: [NgheNghiepComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NgheNghiepService,
    { provide:BaseService, useClass:NgheNghiepService }
  ],
})
export class NgheNghiepModule { }
