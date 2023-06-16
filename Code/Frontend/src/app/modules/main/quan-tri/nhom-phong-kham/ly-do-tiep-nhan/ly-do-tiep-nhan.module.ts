import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LyDoTiepNhanComponent } from './ly-do-tiep-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LyDoTiepNhanRoutingModule } from './ly-do-tiep-nhan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LyDoTiepNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LyDoTiepNhanComponent]
})
export class LyDoTiepNhanModule { }
