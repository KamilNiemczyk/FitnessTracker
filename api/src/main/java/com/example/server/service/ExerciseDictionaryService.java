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

    public ResponseEntity<String> addExerciseDictionary(String exerciseName, String bodyPartName, Integer difficulty) {
        ExerciseDictionary exerciseDictionary = exerciseDictionaryRepository.findByExerciseNameAndBodyPartName(exerciseName, bodyPartName);
        if (exerciseDictionary != null) {
            return ResponseEntity.badRequest().body("Exercise name and body part already exists");
        }
        exerciseDictionary = new ExerciseDictionary(exerciseName, bodyPartName, difficulty);
        exerciseDictionaryRepository.save(exerciseDictionary);
        return ResponseEntity.ok("Exercise name and body part added");
    }

    public ResponseEntity<String> deleteExerciseDictionary(Long id) {
        exerciseDictionaryRepository.deleteById(id);
        return ResponseEntity.ok("Exercise name and body part deleted");
    }

    public ResponseEntity<ExerciseDictionary> getExerciseDictionaryById(Long id) {
        ExerciseDictionary exerciseDictionary = exerciseDictionaryRepository.findById(id).orElse(null);
        if (exerciseDictionary == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(exerciseDictionary);
    }

    public ResponseEntity<String> updateExerciseDictionary(Long id, String exerciseName, String bodyPartName, Integer difficulty) {
        ExerciseDictionary exerciseDictionary = exerciseDictionaryRepository.findById(id).orElse(null);
        if (exerciseDictionary == null) {
            return ResponseEntity.badRequest().body("Exercise name and body part does not exist");
        }
        exerciseDictionary.setExerciseName(exerciseName);
        exerciseDictionary.setBodyPartName(bodyPartName);
        exerciseDictionary.setDifficulty(difficulty);
        exerciseDictionaryRepository.save(exerciseDictionary);
        return ResponseEntity.ok("Exercise name and body part updated");
    }
}
