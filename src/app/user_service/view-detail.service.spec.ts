import { TestBed } from '@angular/core/testing';

import { ViewDetailService } from './view-detail.service';

describe('ViewDetailService', () => {
  let service: ViewDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
