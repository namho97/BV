import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuKyThuatChiTietComponent } from './dich-vu-ky-thuat-chi-tiet.component';

describe('DichVuKyThuatChiTietComponent', () => {
  let component: DichVuKyThuatChiTietComponent;
  let fixture: ComponentFixture<DichVuKyThuatChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuKyThuatChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DichVuKyThuatChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
