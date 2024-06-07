import { TestBed } from '@angular/core/testing';

import { DeshboardServiceService } from './deshboard-service.service';

describe('DeshboardServiceService', () => {
  let service: DeshboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeshboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
