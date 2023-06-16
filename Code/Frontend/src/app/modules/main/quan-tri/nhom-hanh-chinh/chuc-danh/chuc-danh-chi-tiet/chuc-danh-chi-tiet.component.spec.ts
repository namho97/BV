import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucDanhChiTietComponent } from './chuc-danh-chi-tiet.component';

describe('ChucDanhChiTietComponent', () => {
  let component: ChucDanhChiTietComponent;
  let fixture: ComponentFixture<ChucDanhChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChucDanhChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChucDanhChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
