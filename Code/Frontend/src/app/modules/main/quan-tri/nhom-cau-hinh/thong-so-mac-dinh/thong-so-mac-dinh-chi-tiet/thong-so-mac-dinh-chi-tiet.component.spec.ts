import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongSoMacDinhChiTietComponent } from './thong-so-mac-dinh-chi-tiet.component';

describe('ThongSoMacDinhChiTietComponent', () => {
  let component: ThongSoMacDinhChiTietComponent;
  let fixture: ComponentFixture<ThongSoMacDinhChiTietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongSoMacDinhChiTietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThongSoMacDinhChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
