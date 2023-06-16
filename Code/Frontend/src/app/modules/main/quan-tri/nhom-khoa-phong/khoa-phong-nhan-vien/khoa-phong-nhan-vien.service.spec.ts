import { TestBed } from '@angular/core/testing';

import { KhoaPhongNhanVienService } from './khoa-phong-nhan-vien.service';

describe('KhoaPhongNhanVienService', () => {
  let service: KhoaPhongNhanVienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaPhongNhanVienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
