/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';

import { TextmaskComponent } from './textmask.component';

describe('TextmaskComponent', () => {
  let component: TextmaskComponent;
  let fixture: ComponentFixture<TextmaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextmaskComponent ],
      imports:[MatFormFieldModule,TextMaskModule,MatInputModule,BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextmaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
