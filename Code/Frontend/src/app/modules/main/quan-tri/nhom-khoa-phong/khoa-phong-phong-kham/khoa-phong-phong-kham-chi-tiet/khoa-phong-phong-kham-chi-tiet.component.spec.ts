import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaPhongPhongKhamChiTietComponent } from './khoa-phong-phong-kham-chi-tiet.component';

describe('KhoaPhongPhongKhamChiTietComponent', () => {
  let component: KhoaPhongPhongKhamChiTietComponent;
  let fixture: ComponentFixture<KhoaPhongPhongKhamChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhoaPhongPhongKhamChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhoaPhongPhongKhamChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
