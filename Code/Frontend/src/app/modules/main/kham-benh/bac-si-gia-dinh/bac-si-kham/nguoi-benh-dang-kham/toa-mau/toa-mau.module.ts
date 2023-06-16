import { ToaMauService } from './toa-mau.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToaMauComponent } from './toa-mau.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  exports:[ToaMauComponent],
  declarations: [ToaMauComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ToaMauService,
    { provide:BaseService, useClass:    ToaMauService,
 }
  ],
})
export class ToaMauModule { }
