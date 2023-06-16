import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichVuKhamChiTietComponent } from './dich-vu-kham-chi-tiet.component';

describe('DichVuKhamChiTietComponent', () => {
  let component: DichVuKhamChiTietComponent;
  let fixture: ComponentFixture<DichVuKhamChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichVuKhamChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DichVuKhamChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
