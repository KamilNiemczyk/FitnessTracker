import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsExercisesComponent } from './workouts-exercises.component';

describe('WorkoutsExercisesComponent', () => {
  let component: WorkoutsExercisesComponent;
  let fixture: ComponentFixture<WorkoutsExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsExercisesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WorkoutsExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
