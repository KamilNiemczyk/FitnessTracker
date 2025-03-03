package com.example.server.service;


import com.example.server.dto.NewRecordDto;
import com.example.server.model.Exercise;
import com.example.server.model.ExerciseDictionary;
import com.example.server.model.ExerciseRecord;
import com.example.server.repository.ExerciseDictionaryRepository;
import com.example.server.repository.ExerciseRepository;
import com.example.server.repository.WorkoutRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final ExerciseDictionaryRepository exerciseDictionaryRepository;
    private final WorkoutRepository workoutRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, ExerciseDictionaryRepository exerciseDictionaryRepository, WorkoutRepository workoutRepository) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseDictionaryRepository = exerciseDictionaryRepository;
        this.workoutRepository = workoutRepository;
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

    public ResponseEntity<String> addExerciseRecord(Long exerciseId, Integer weight, Integer reps) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElse(null);
        if (exercise == null) {
            return ResponseEntity.badRequest().body("Exercise not found");
        }

        ExerciseRecord exerciseRecord = new ExerciseRecord(weight, reps);
        exercise.addExerciseRecord(exerciseRecord);
        exerciseRepository.save(exercise);
        return ResponseEntity.ok("Exercise record added");
    }

    public ResponseEntity<String> createExerciseWithDictionaryIdAndRecords(Long workoutId, Integer orderInWorkout, Long exerciseDictionaryId, List<NewRecordDto> records) {
        Exercise exercise = new Exercise(orderInWorkout);
        exercise.setWorkout(workoutRepository.findById(workoutId).orElse(null));
        exercise.setExerciseDictionary(exerciseDictionaryRepository.findById(exerciseDictionaryId).orElse(null));
        for (NewRecordDto record : records) {
            exercise.addExerciseRecord(new ExerciseRecord(record.getWeight(), record.getReps()));
        }
        exerciseRepository.save(exercise);
        return ResponseEntity.ok("Exercise created");
    }
}
