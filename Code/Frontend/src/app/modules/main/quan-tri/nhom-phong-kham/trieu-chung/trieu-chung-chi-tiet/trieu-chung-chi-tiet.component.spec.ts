import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrieuChungChiTietComponent } from './trieu-chung-chi-tiet.component';

describe('TrieuChungChiTietComponent', () => {
  let component: TrieuChungChiTietComponent;
  let fixture: ComponentFixture<TrieuChungChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrieuChungChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrieuChungChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
