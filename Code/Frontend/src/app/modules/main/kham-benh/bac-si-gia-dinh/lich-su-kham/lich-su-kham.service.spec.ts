/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LichSuKhamService } from './lich-su-kham.service';

describe('Service: LichSuKham', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LichSuKhamService]
    });
  });

  it('should ...', inject([LichSuKhamService], (service: LichSuKhamService) => {
    expect(service).toBeTruthy();
  }));
});
