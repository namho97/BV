import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoChiTietComponent } from './kho-chi-tiet.component';

describe('KhoChiTietComponent', () => {
  let component: KhoChiTietComponent;
  let fixture: ComponentFixture<KhoChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhoChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhoChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
