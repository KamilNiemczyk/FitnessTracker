package com.example.server.service;


import com.example.server.model.Exercise;
import com.example.server.model.Workout;
import com.example.server.repository.WorkoutRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public ResponseEntity<String> addExercise(Long workoutId){
        Integer numExercises = workoutRepository.findById(workoutId).get().getExercises().size();
        Workout workout = workoutRepository.findById(workoutId).get();
        workout.addExercise(new Exercise(numExercises+1));
        workoutRepository.save(workout);
        return ResponseEntity.ok("Exercise added to workout");
    }

    public List<Exercise> getExercises(Long workoutId) {
        return workoutRepository.findById(workoutId).get().getExercises();
    }
}
