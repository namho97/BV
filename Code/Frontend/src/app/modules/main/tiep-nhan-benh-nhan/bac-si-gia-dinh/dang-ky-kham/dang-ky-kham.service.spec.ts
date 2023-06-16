/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DangKyKhamService } from './dang-ky-kham.service';

describe('Service: DangKyKham', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DangKyKhamService]
    });
  });

  it('should ...', inject([DangKyKhamService], (service: DangKyKhamService) => {
    expect(service).toBeTruthy();
  }));
});
