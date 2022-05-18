import { TestBed } from '@angular/core/testing';

import { ChooseRoleGuard } from './choose-role.guard';

describe('ChooseRoleGuard', () => {
  let guard: ChooseRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChooseRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
