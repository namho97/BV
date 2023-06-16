import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TaiKhoanModule } from 'src/app/modules/main/thong-tin-tai-khoan/tai-khoan/tai-khoan.module';
import { DoiMatKhauModule } from 'src/app/modules/main/thong-tin-tai-khoan/doi-mat-khau/doi-mat-khau.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    FlexLayoutModule,
    RouterModule,
    DoiMatKhauModule,
    TaiKhoanModule,
    MatTooltipModule,
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
