import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoSoNhanVienDoiMatKhauComponent } from './ho-so-nhan-vien-doi-mat-khau.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports:[HoSoNhanVienDoiMatKhauComponent],
  declarations: [HoSoNhanVienDoiMatKhauComponent]
})
export class HoSoNhanVienDoiMatKhauModule { }
