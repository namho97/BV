import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuongDungChiTietComponent } from './duong-dung-chi-tiet.component';

describe('DuongDungChiTietComponent', () => {
  let component: DuongDungChiTietComponent;
  let fixture: ComponentFixture<DuongDungChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuongDungChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuongDungChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
