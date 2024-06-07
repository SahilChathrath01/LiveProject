import { TestBed } from '@angular/core/testing';

import { UserServersService } from './user-servers.service';

describe('UserServersService', () => {
  let service: UserServersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
