/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HoSoNhanVienService } from './ho-so-nhan-vien.service';

describe('Service: HoSoNhanVien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoSoNhanVienService]
    });
  });

  it('should ...', inject([HoSoNhanVienService], (service: HoSoNhanVienService) => {
    expect(service).toBeTruthy();
  }));
});
