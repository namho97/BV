import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaPhongNhanVienChiTietComponent } from './khoa-phong-nhan-vien-chi-tiet.component';

describe('KhoaPhongNhanVienChiTietComponent', () => {
  let component: KhoaPhongNhanVienChiTietComponent;
  let fixture: ComponentFixture<KhoaPhongNhanVienChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhoaPhongNhanVienChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhoaPhongNhanVienChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
