import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuKhamComponent } from './lich-su-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuKhamRoutingModule } from './lich-su-kham-routing.module';
import { LichSuKhamChiTietModule } from './lich-su-kham-chi-tiet/lich-su-kham-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { LichSuKhamService } from './lich-su-kham.service';

@NgModule({
  imports: [
    CommonModule,
    LichSuKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    LichSuKhamChiTietModule
  ],
  declarations: [LichSuKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    LichSuKhamService,
    { provide:BaseService, useClass:LichSuKhamService }
  ],
})
export class LichSuKhamModule { }
