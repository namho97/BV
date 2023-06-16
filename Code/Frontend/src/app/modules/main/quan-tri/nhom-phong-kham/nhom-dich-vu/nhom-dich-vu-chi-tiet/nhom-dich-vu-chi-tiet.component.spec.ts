import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomDichVuChiTietComponent } from './nhom-dich-vu-chi-tiet.component';

describe('NhomDichVuChiTietComponent', () => {
  let component: NhomDichVuChiTietComponent;
  let fixture: ComponentFixture<NhomDichVuChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhomDichVuChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhomDichVuChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
