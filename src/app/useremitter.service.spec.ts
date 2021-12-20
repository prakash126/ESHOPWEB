import { TestBed } from '@angular/core/testing';

import { UseremitterService } from './useremitter.service';

describe('UseremitterService', () => {
  let service: UseremitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseremitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
