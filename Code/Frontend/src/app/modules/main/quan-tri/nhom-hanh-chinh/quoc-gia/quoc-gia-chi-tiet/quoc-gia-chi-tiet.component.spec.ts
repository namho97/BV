import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuocGiaChiTietComponent } from './quoc-gia-chi-tiet.component';

describe('QuocGiaChiTietComponent', () => {
  let component: QuocGiaChiTietComponent;
  let fixture: ComponentFixture<QuocGiaChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuocGiaChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuocGiaChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
