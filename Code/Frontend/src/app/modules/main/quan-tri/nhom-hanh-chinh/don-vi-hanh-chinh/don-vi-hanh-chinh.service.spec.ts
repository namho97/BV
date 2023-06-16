/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonViHanhChinhService } from './don-vi-hanh-chinh.service';

describe('Service: DonViHanhChinh', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonViHanhChinhService]
    });
  });

  it('should ...', inject([DonViHanhChinhService], (service: DonViHanhChinhService) => {
    expect(service).toBeTruthy();
  }));
});
