import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToaThuocMauChiTietComponent } from './toa-thuoc-mau-chi-tiet.component';

describe('ToaThuocMauChiTietComponent', () => {
  let component: ToaThuocMauChiTietComponent;
  let fixture: ComponentFixture<ToaThuocMauChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToaThuocMauChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToaThuocMauChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
