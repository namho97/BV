import { LichHenRoutingModule } from './lich-hen-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichHenComponent } from './lich-hen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichHenSharedModule } from './lich-hen-shared/lich-hen-shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    LichHenRoutingModule,
    LichHenSharedModule
  ],
  declarations: [LichHenComponent]
})
export class LichHenModule { }
