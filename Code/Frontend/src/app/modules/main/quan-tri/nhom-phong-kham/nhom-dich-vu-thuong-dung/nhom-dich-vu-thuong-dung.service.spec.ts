import { TestBed } from '@angular/core/testing';

import { NhomDichVuThuongDungService } from './nhom-dich-vu-thuong-dung.service';

describe('NhomDichVuThuongDungService', () => {
  let service: NhomDichVuThuongDungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomDichVuThuongDungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
