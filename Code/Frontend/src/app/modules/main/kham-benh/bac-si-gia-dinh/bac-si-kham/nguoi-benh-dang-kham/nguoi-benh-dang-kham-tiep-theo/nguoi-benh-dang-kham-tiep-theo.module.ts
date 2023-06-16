import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamTiepTheoComponent } from './nguoi-benh-dang-kham-tiep-theo.component';
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
  exports:[NguoiBenhDangKhamTiepTheoComponent],
  declarations: [NguoiBenhDangKhamTiepTheoComponent]
})
export class NguoiBenhDangKhamTiepTheoModule { }
