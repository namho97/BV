import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoiMatKhauComponent } from './doi-mat-khau.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  declarations: [DoiMatKhauComponent]
})
export class DoiMatKhauModule { }
