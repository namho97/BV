import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhomDichVuChiTietComponent } from './nhom-dich-vu-chi-tiet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[NhomDichVuChiTietComponent],
  declarations: [NhomDichVuChiTietComponent]
})
export class NhomDichVuChiTietModule { }
