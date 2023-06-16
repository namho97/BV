import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoiBenhChiTietComponent } from './nguoi-benh-chi-tiet.component';

describe('NguoiBenhChiTietComponent', () => {
  let component: NguoiBenhChiTietComponent;
  let fixture: ComponentFixture<NguoiBenhChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NguoiBenhChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NguoiBenhChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
