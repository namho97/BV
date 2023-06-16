import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViTriDeDuocPhamVatTuChiTietComponent } from './vi-tri-de-duoc-pham-vat-tu-chi-tiet.component';

describe('ViTriDeDuocPhamVatTuChiTietComponent', () => {
  let component: ViTriDeDuocPhamVatTuChiTietComponent;
  let fixture: ComponentFixture<ViTriDeDuocPhamVatTuChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViTriDeDuocPhamVatTuChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViTriDeDuocPhamVatTuChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
