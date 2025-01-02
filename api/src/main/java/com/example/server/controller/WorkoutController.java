package com.example.server.controller;


import com.example.server.model.Exercise;
import com.example.server.security.ValidateToken;
import com.example.server.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout")
public class WorkoutController {
    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @ValidateToken
    @PostMapping("/add-exercise")
    public ResponseEntity<String> addExercise(@RequestBody WorkoutRequest workoutRequest) {
        return workoutService.addExercise(workoutRequest.getWorkoutId());
    }

    @ValidateToken
    @GetMapping("/get-exercises")
    public List<Exercise> getExercises(@RequestBody WorkoutRequest workoutRequest) {
        return workoutService.getExercises(workoutRequest.getWorkoutId());
    }
}
