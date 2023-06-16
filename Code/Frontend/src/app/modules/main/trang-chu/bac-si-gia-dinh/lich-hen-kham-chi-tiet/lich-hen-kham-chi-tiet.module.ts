import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichHenKhamChiTietComponent } from './lich-hen-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  exports:[LichHenKhamChiTietComponent],
  declarations: [LichHenKhamChiTietComponent]
})
export class LichHenKhamChiTietModule { }
