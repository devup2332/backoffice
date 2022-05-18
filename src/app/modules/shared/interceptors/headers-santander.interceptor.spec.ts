import { TestBed } from '@angular/core/testing';

import { HeadersSantanderInterceptor } from './headers-santander.interceptor';

describe('HeadersSantanderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HeadersSantanderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HeadersSantanderInterceptor = TestBed.inject(HeadersSantanderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
