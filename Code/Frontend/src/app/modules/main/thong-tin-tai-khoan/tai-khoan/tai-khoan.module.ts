import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaiKhoanComponent } from './tai-khoan.component';
import { TaiKhoanRoutingModule } from './tai-khoan-routing.module';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    TaiKhoanRoutingModule,
    MatDividerModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    MatExpansionModule,
    FlexLayoutModule
  ],
  declarations: [TaiKhoanComponent]
})
export class TaiKhoanModule { }
