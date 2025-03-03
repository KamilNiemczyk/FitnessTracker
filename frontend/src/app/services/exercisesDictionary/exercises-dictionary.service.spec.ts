import { TestBed } from '@angular/core/testing';

import { ExercisesDictionaryService } from './exercises-dictionary.service';

describe('ExercisesDictionaryService', () => {
  let service: ExercisesDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
