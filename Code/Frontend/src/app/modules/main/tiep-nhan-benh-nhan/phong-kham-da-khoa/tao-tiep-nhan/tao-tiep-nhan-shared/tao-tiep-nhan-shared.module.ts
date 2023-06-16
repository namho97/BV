import { NgScrollbarModule } from 'ngx-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaoTiepNhanSharedComponent } from './tao-tiep-nhan-shared.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NguoiBenhDangKhamChiDinhModule } from 'src/app/modules/main/kham-benh/phong-kham-da-khoa/bac-si-kham/nguoi-benh-dang-kham/nguoi-benh-dang-kham-chi-dinh/nguoi-benh-dang-kham-chi-dinh.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
    NguoiBenhDangKhamChiDinhModule
  ],
  exports:[TaoTiepNhanSharedComponent],
  declarations: [TaoTiepNhanSharedComponent]
})
export class TaoTiepNhanSharedModule { }
