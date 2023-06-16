import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxnumericComponent } from './textboxnumeric.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TextboxnumericComponent', () => {
  let component: TextboxnumericComponent;
  let fixture: ComponentFixture<TextboxnumericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextboxnumericComponent ],
      imports:[BrowserAnimationsModule,MatFormFieldModule,MatInputModule,FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxnumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
