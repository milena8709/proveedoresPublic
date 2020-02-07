import { TestBed } from '@angular/core/testing';

import { CamposproveedorService } from './camposproveedor.service';

describe('CamposproveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CamposproveedorService = TestBed.get(CamposproveedorService);
    expect(service).toBeTruthy();
  });
});
