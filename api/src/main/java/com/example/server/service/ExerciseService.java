package com.example.server.service;


import com.example.server.model.Exercise;
import com.example.server.model.ExerciseDictionary;
import com.example.server.repository.ExerciseDictionaryRepository;
import com.example.server.repository.ExerciseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final ExerciseDictionaryRepository exerciseDictionaryRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, ExerciseDictionaryRepository exerciseDictionaryRepository) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseDictionaryRepository = exerciseDictionaryRepository;
    }

    public ResponseEntity<String> addExerciseDictionaryId(Long exerciseId, Long exerciseDictionaryId) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElse(null);
        if (exercise == null) {
            return ResponseEntity.badRequest().body("Exercise not found");
        }

        ExerciseDictionary exerciseDictionary = exerciseDictionaryRepository.findById(exerciseDictionaryId).orElse(null);
        if (exerciseDictionary == null) {
            return ResponseEntity.badRequest().body("Exercise name or body part not found");
        }

        exercise.setExerciseDictionary(exerciseDictionary);
        exerciseRepository.save(exercise);
        return ResponseEntity.ok("Exercise NameAndBodyPart added to exercise");
    }

}
