import { TestBed } from '@angular/core/testing';

import { IddServicesService } from './idd-services.service';

describe('IddServicesService', () => {
  let service: IddServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IddServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
