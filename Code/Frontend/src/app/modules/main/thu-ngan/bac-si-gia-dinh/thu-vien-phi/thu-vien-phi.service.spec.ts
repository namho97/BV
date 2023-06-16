/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThuVienPhiService } from './thu-vien-phi.service';

describe('Service: ThuVienPhi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThuVienPhiService]
    });
  });

  it('should ...', inject([ThuVienPhiService], (service: ThuVienPhiService) => {
    expect(service).toBeTruthy();
  }));
});
