import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaCungCapChiTietComponent } from './nha-cung-cap-chi-tiet.component';

describe('NhaCungCapChiTietComponent', () => {
  let component: NhaCungCapChiTietComponent;
  let fixture: ComponentFixture<NhaCungCapChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NhaCungCapChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NhaCungCapChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
