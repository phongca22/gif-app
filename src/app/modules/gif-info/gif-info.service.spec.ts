import { TestBed } from '@angular/core/testing';

import { GifInfoService } from './gif-info.service';

describe('GifInfoService', () => {
  let service: GifInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
