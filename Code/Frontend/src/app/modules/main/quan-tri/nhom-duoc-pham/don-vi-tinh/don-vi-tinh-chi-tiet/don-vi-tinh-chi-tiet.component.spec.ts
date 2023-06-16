import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonViTinhChiTietComponent } from './don-vi-tinh-chi-tiet.component';

describe('DonViTinhChiTietComponent', () => {
  let component: DonViTinhChiTietComponent;
  let fixture: ComponentFixture<DonViTinhChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonViTinhChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonViTinhChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
