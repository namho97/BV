import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoaPhongChiTietComponent } from './khoa-phong-chi-tiet.component';

describe('KhoaPhongChiTietComponent', () => {
  let component: KhoaPhongChiTietComponent;
  let fixture: ComponentFixture<KhoaPhongChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhoaPhongChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhoaPhongChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
