import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuongTacThuocChiTietComponent } from './tuong-tac-thuoc-chi-tiet.component';

describe('TuongTacThuocChiTietComponent', () => {
  let component: TuongTacThuocChiTietComponent;
  let fixture: ComponentFixture<TuongTacThuocChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuongTacThuocChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuongTacThuocChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
