import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanTocChiTietComponent } from './dan-toc-chi-tiet.component';

describe('DanTocChiTietComponent', () => {
  let component: DanTocChiTietComponent;
  let fixture: ComponentFixture<DanTocChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanTocChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanTocChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
