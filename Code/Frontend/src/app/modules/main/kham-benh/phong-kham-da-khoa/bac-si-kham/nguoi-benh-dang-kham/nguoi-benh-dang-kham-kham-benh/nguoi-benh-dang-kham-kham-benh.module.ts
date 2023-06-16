import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamKhamBenhComponent } from './nguoi-benh-dang-kham-kham-benh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[NguoiBenhDangKhamKhamBenhComponent],
  declarations: [NguoiBenhDangKhamKhamBenhComponent]
})
export class NguoiBenhDangKhamKhamBenhModule { }
