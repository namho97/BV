import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBangChuyenMonChiTietComponent } from './van-bang-chuyen-mon-chi-tiet.component';

describe('VanBangChuyenMonChiTietComponent', () => {
  let component: VanBangChuyenMonChiTietComponent;
  let fixture: ComponentFixture<VanBangChuyenMonChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VanBangChuyenMonChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanBangChuyenMonChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
