import { DoiMatKhauRoutingModule } from './doi-mat-khau-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoiMatKhauComponent } from './doi-mat-khau.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DoiMatKhauRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    SharedModule,
  ],
  declarations: [DoiMatKhauComponent]
})
export class DoiMatKhauModule { }
