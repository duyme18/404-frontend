import { TestBed } from '@angular/core/testing';

import { ImageHomeService } from './image-home.service';

describe('ImageHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageHomeService = TestBed.get(ImageHomeService);
    expect(service).toBeTruthy();
  });
});
