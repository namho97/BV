import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuVienPhiComponent } from './thu-vien-phi.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { ThuVienPhiService } from './thu-vien-phi.service';
import { ThuVienPhiRoutingModule } from './thu-vien-phi-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThuVienPhiChiTietModule } from './thu-vien-phi-chi-tiet/thu-vien-phi-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    ThuVienPhiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThuVienPhiChiTietModule
  ],
  declarations: [ThuVienPhiComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ThuVienPhiService,
    { provide:BaseService, useClass:ThuVienPhiService }
  ]
})
export class ThuVienPhiModule { }
