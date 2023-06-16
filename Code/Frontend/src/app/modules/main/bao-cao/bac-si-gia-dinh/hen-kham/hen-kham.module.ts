import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HenKhamComponent } from './hen-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HenKhamRoutingModule } from './hen-kham-routing.module';
import { InBaoCaoHenKhamModule } from './in-bao-cao-hen-kham/in-bao-cao-hen-kham.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { HenKhamService } from './hen-kham.service';

@NgModule({
  imports: [
    CommonModule,
    HenKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    InBaoCaoHenKhamModule
  ],
  declarations: [HenKhamComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    HenKhamService,
    { provide:BaseService, useClass:HenKhamService }
  ],
})
export class HenKhamModule { }
