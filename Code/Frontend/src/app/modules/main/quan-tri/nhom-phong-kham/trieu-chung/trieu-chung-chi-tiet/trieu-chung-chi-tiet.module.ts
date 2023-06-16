import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrieuChungChiTietComponent } from './trieu-chung-chi-tiet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[TrieuChungChiTietComponent],
  declarations: [TrieuChungChiTietComponent]
})
export class TrieuChungChiTietModule { }
