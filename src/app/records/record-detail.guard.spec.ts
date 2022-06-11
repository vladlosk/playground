import { TestBed } from '@angular/core/testing';

import { RecordDetailGuard } from './record-detail.guard';

describe('RecordDetailGuard', () => {
  let guard: RecordDetailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecordDetailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
