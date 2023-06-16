import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhapKetQuaComponent } from './nhap-ket-qua.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhapKetQuaRoutingModule } from './nhap-ket-qua-routing.module';
import { NhapKetQuaChiTietModule } from './nhap-ket-qua-chi-tiet/nhap-ket-qua-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NhapKetQuaRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhapKetQuaChiTietModule
  ],
  declarations: [NhapKetQuaComponent]
})
export class NhapKetQuaModule { }
