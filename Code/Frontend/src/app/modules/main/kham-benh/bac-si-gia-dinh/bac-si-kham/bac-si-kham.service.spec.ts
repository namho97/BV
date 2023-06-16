/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BacSiKhamService } from './bac-si-kham.service';

describe('Service: BacSiKham', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BacSiKhamService]
    });
  });

  it('should ...', inject([BacSiKhamService], (service: BacSiKhamService) => {
    expect(service).toBeTruthy();
  }));
});
