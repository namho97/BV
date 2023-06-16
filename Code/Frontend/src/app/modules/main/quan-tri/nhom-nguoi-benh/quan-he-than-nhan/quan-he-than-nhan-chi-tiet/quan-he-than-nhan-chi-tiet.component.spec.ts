import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanHeThanNhanChiTietComponent } from './quan-he-than-nhan-chi-tiet.component';

describe('QuanHeThanNhanChiTietComponent', () => {
  let component: QuanHeThanNhanChiTietComponent;
  let fixture: ComponentFixture<QuanHeThanNhanChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanHeThanNhanChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuanHeThanNhanChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
