import { TestBed } from '@angular/core/testing';

import { CharappService } from './charapp.service';

describe('CharappService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharappService = TestBed.get(CharappService);
    expect(service).toBeTruthy();
  });
});
