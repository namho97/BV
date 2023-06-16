/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LichSuThuVienPhiService } from './lich-su-thu-vien-phi.service';

describe('Service: LichSuThuVienPhi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LichSuThuVienPhiService]
    });
  });

  it('should ...', inject([LichSuThuVienPhiService], (service: LichSuThuVienPhiService) => {
    expect(service).toBeTruthy();
  }));
});
