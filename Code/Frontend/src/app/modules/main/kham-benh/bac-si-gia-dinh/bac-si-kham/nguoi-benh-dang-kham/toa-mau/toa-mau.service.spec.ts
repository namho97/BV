/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ToaMauService } from './toa-mau.service';

describe('Service: ToaMau', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToaMauService]
    });
  });

  it('should ...', inject([ToaMauService], (service: ToaMauService) => {
    expect(service).toBeTruthy();
  }));
});
