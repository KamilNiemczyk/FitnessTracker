package com.example.server.service;


import com.example.server.model.Exercise;
import com.example.server.model.Workout;
import com.example.server.repository.ExerciseRepository;
import com.example.server.repository.WorkoutRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;


    public WorkoutService(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
    }

    public ResponseEntity<String> addExercise(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId).orElse(null);
        if (workout == null) {
            return ResponseEntity.badRequest().body("Workout not found");
        }

        Integer numExercises = workout.getExercises().size();
        Exercise newExercise = new Exercise(numExercises + 1);
        newExercise.setWorkout(workout);
        workout.addExercise(newExercise);
        workoutRepository.save(workout);
        exerciseRepository.save(newExercise);
        return ResponseEntity.ok("Exercise added to workout");
    }

    public List<Exercise> getExercises(Long workoutId) {
        return workoutRepository.findById(workoutId).get().getExercises();
    }
}
