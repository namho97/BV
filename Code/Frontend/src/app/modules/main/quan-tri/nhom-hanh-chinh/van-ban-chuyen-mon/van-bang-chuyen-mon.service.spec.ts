import { TestBed } from '@angular/core/testing';

import { VanBangChuyenMonService } from './van-bang-chuyen-mon.service';

describe('VanBangChuyenMonService', () => {
  let service: VanBangChuyenMonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBangChuyenMonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
