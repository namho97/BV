import { TestBed } from '@angular/core/testing';

import { KhoaPhongPhongKhamService } from './khoa-phong-phong-kham.service';

describe('KhoaPhongPhongKhamService', () => {
  let service: KhoaPhongPhongKhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaPhongPhongKhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
