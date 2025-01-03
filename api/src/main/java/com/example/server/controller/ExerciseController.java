package com.example.server.controller;


import com.example.server.dto.ExerciseDictionaryRequest;
import com.example.server.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @Autowired
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @PostMapping("add-exercise-dictionary-id")
    public ResponseEntity<String> addExerciseDictionaryId(@RequestBody ExerciseDictionaryRequest request) {
        return exerciseService.addExerciseDictionaryId(request.getExerciseId(), request.getExerciseDictionaryId());
    }
}
