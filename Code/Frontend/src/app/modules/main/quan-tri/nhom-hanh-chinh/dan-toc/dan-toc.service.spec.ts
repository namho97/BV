import { TestBed } from '@angular/core/testing';

import { DanTocService } from './dan-toc.service';

describe('DanTocService', () => {
  let service: DanTocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanTocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
