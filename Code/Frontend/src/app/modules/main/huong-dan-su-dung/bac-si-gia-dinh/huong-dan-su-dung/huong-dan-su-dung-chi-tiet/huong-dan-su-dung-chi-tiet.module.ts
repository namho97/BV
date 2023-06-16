import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuongDanSuDungChiTietComponent } from './huong-dan-su-dung-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[HuongDanSuDungChiTietComponent],
  declarations: [HuongDanSuDungChiTietComponent]
})
export class HuongDanSuDungChiTietModule { }
