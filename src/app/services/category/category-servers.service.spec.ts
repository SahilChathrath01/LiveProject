import { TestBed } from '@angular/core/testing';

import { CategoryServersService } from './category-servers.service';

describe('CategoryServersService', () => {
  let service: CategoryServersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryServersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
