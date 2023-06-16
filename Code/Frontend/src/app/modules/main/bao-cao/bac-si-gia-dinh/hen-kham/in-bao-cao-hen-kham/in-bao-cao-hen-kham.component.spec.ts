import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InBaoCaoHenKhamComponent } from './in-bao-cao-hen-kham.component';

describe('InBaoCaoHenKhamComponent', () => {
  let component: InBaoCaoHenKhamComponent;
  let fixture: ComponentFixture<InBaoCaoHenKhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InBaoCaoHenKhamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InBaoCaoHenKhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
