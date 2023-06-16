import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacSiKhamComponent } from './bac-si-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BacSiKhamRoutingModule } from './bac-si-kham-routing.module';
import { NguoiBenhDangKhamModule } from './nguoi-benh-dang-kham/nguoi-benh-dang-kham.module';
import { ThongTinLanKhamModule } from './thong-tin-lan-kham/thong-tin-lan-kham.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { BacSiKhamService } from './bac-si-kham.service';

@NgModule({
  imports: [
    CommonModule,
    BacSiKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NguoiBenhDangKhamModule,
    ThongTinLanKhamModule
  ],
  declarations: [BacSiKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    BacSiKhamService,
    { provide:BaseService, useClass:BacSiKhamService }
  ],
})
export class BacSiKhamModule { }
