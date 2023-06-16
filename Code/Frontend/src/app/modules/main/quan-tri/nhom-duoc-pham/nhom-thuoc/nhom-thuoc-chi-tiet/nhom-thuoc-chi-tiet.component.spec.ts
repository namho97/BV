import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomThuocChiTietComponent } from './nhom-thuoc-chi-tiet.component';

describe('NhomThuocChiTietComponent', () => {
  let component: NhomThuocChiTietComponent;
  let fixture: ComponentFixture<NhomThuocChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhomThuocChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhomThuocChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
