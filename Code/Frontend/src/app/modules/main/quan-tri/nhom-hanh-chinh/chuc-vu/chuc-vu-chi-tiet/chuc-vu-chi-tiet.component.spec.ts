import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChucVuChiTietComponent } from './chuc-vu-chi-tiet.component';

describe('ChucVuChiTietComponent', () => {
  let component: ChucVuChiTietComponent;
  let fixture: ComponentFixture<ChucVuChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChucVuChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChucVuChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
