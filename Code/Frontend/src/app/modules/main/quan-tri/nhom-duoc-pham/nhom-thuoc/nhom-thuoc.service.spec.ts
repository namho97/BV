import { TestBed } from '@angular/core/testing';

import { NhomThuocService } from './nhom-thuoc.service';

describe('NhomThuocService', () => {
  let service: NhomThuocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomThuocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
