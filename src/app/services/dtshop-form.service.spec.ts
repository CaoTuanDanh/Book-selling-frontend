import { TestBed } from '@angular/core/testing';

import { DTShopFormService } from './dtshop-form.service';

describe('DTShopFormService', () => {
  let service: DTShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DTShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
