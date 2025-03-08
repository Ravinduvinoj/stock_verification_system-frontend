import { TestBed } from '@angular/core/testing';

import { ApimService } from './apim.service';

describe('ApimService', () => {
  let service: ApimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
