import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuongTacThuocComponent } from './tuong-tac-thuoc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuongTacThuocRoutingModule } from './tuong-tac-thuoc-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TuongTacThuocService } from './tuong-tac-thuoc.service';
import { BaseService } from 'src/app/core/services/base.service';
import { TuongTacThuocChiTietModule } from './tuong-tac-thuoc-chi-tiet/tuong-tac-thuoc-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    TuongTacThuocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    TuongTacThuocChiTietModule
  ],
  declarations: [TuongTacThuocComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    TuongTacThuocService,
    { provide:BaseService, useClass:TuongTacThuocService }
  ],
})
export class TuongTacThuocModule { }
