package com.example.server.service;


import org.springframework.stereotype.Service;
import com.example.server.model.ExerciseDictionary;
import com.example.server.repository.ExerciseDictionaryRepository;
import org.springframework.http.ResponseEntity;
import java.util.List;


@Service
public class ExerciseDictionaryService {
    private final ExerciseDictionaryRepository exerciseDictionaryRepository;

    public ExerciseDictionaryService(ExerciseDictionaryRepository exerciseDictionaryRepository) {
        this.exerciseDictionaryRepository = exerciseDictionaryRepository;
    }

    public List<ExerciseDictionary> getExerciseDictionaries() {
        return exerciseDictionaryRepository.findAll();
    }

    public ResponseEntity<String> addExerciseDictionary(String exerciseName, String bodyPartName) {
        ExerciseDictionary exerciseDictionary = exerciseDictionaryRepository.findByExerciseNameAndBodyPartName(exerciseName, bodyPartName);
        if (exerciseDictionary != null) {
            return ResponseEntity.badRequest().body("Exercise name and body part already exists");
        }
        exerciseDictionary = new ExerciseDictionary(exerciseName, bodyPartName);
        exerciseDictionaryRepository.save(exerciseDictionary);
        return ResponseEntity.ok("Exercise name and body part added");
    }
}
