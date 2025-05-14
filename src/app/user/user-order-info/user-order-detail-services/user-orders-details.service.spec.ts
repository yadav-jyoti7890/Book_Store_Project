import { TestBed } from '@angular/core/testing';

import { UserOrdersDetailsService } from './user-orders-details.service';

describe('UserOrdersDetailsService', () => {
  let service: UserOrdersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOrdersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
