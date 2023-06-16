import { NgChartsModule } from 'ng2-charts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrangChuComponent } from './trang-chu.component';
import { TrangChuRoutingModule } from './trang-chu-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TrangChuService } from './trang-chu.service';
import { BaseService } from 'src/app/core/services/base.service';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  imports: [
    CommonModule,
    TrangChuRoutingModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    NgScrollbarModule,
    NgChartsModule
  ],
  declarations: [
    TrangChuComponent,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    TrangChuService,
    { provide:BaseService, useClass:TrangChuService }
  ],
  entryComponents: [
  ]
})
export class TrangChuModule { }
