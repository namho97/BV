import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongSoMacDinhComponent } from './thong-so-mac-dinh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThongSoMacDinhRoutingModule } from './thong-so-mac-dinh-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { ThongSoMacDinhService } from './thong-so-mac-dinh.service';
import { ThongSoMacDinhChiTietModule } from './thong-so-mac-dinh-chi-tiet/thong-so-mac-dinh-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    ThongSoMacDinhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThongSoMacDinhChiTietModule
  ],
  declarations: [ThongSoMacDinhComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ThongSoMacDinhService,
    { provide:BaseService, useClass:ThongSoMacDinhService }
  ],
})
export class ThongSoMacDinhModule { }
