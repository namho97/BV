import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgheNghiepChiTietComponent } from './nghe-nghiep-chi-tiet.component';

describe('NgheNghiepChiTietComponent', () => {
  let component: NgheNghiepChiTietComponent;
  let fixture: ComponentFixture<NgheNghiepChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgheNghiepChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgheNghiepChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
