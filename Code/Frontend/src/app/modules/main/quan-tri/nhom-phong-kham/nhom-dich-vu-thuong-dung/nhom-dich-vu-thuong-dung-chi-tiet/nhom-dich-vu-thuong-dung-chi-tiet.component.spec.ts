import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomDichVuThuongDungChiTietComponent } from './nhom-dich-vu-thuong-dung-chi-tiet.component';

describe('NhomDichVuThuongDungChiTietComponent', () => {
  let component: NhomDichVuThuongDungChiTietComponent;
  let fixture: ComponentFixture<NhomDichVuThuongDungChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhomDichVuThuongDungChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhomDichVuThuongDungChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
