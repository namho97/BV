import { TestBed } from '@angular/core/testing';

import { DonViTinhService } from './don-vi-tinh.service';

describe('DonViTinhService', () => {
  let service: DonViTinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonViTinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
