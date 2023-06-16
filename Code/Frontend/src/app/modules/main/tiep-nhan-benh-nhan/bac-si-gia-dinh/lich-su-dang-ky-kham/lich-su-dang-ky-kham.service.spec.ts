/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LichSuDangKyKhamService } from './lich-su-dang-ky-kham.service';

describe('Service: LichSuDangKyKham', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LichSuDangKyKhamService]
    });
  });

  it('should ...', inject([LichSuDangKyKhamService], (service: LichSuDangKyKhamService) => {
    expect(service).toBeTruthy();
  }));
});
