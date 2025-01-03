package com.example.server.controller;


import com.example.server.dto.AddExerciseDictionaryRequest;
import com.example.server.model.ExerciseDictionary;
import com.example.server.service.ExerciseDictionaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercise-dictionary")
public class ExerciseDictionaryController {
    private final ExerciseDictionaryService exerciseDictionaryService;

    @Autowired
    public ExerciseDictionaryController(ExerciseDictionaryService exerciseDictionaryService) {
        this.exerciseDictionaryService = exerciseDictionaryService;
    }

    @GetMapping("/all")
    public List<ExerciseDictionary> getExerciseDictionaries() {
        return exerciseDictionaryService.getExerciseDictionaries();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addExerciseDictionary(@RequestBody AddExerciseDictionaryRequest request) {
        return exerciseDictionaryService.addExerciseDictionary(request.getExerciseName(), request.getBodyPartName());
    }


}
