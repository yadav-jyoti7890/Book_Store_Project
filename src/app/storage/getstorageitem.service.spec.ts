import { TestBed } from '@angular/core/testing';

import { GetstorageitemService } from './getstorageitem.service';

describe('GetstorageitemService', () => {
  let service: GetstorageitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetstorageitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
