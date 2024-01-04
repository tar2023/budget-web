import { TestBed } from '@angular/core/testing';

import { RequirementService } from './requirment.service';

describe('RequirementService', () => {
  let service: RequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
