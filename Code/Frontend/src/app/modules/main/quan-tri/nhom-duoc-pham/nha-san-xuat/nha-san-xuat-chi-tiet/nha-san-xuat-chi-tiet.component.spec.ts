import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaSanXuatChiTietComponent } from './nha-san-xuat-chi-tiet.component';

describe('NhaSanXuatChiTietComponent', () => {
  let component: NhaSanXuatChiTietComponent;
  let fixture: ComponentFixture<NhaSanXuatChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhaSanXuatChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhaSanXuatChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
