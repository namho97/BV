import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamKetQuaLsClsComponent } from './nguoi-benh-dang-kham-ket-qua-ls-cls.component';
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
  exports:[NguoiBenhDangKhamKetQuaLsClsComponent],
  declarations: [NguoiBenhDangKhamKetQuaLsClsComponent]
})
export class NguoiBenhDangKhamKetQuaLsClsModule { }
