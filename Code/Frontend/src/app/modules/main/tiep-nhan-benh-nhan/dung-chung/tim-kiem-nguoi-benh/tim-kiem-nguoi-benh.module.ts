import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimKiemNguoiBenhComponent } from './tim-kiem-nguoi-benh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[TimKiemNguoiBenhComponent],
  declarations: [TimKiemNguoiBenhComponent]
})
export class TimKiemNguoiBenhModule { }
