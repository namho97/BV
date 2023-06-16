/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IcdService } from './icd.service';

describe('Service: Icd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IcdService]
    });
  });

  it('should ...', inject([IcdService], (service: IcdService) => {
    expect(service).toBeTruthy();
  }));
});
