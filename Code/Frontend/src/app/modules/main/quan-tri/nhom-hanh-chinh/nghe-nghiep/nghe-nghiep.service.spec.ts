import { TestBed } from '@angular/core/testing';

import { NgheNghiepService } from './nghe-nghiep.service';

describe('NgheNghiepService', () => {
  let service: NgheNghiepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgheNghiepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
