package com.example.server.repository;


import com.example.server.model.ExerciseDictionary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseDictionaryRepository extends JpaRepository<ExerciseDictionary, Long> {
    ExerciseDictionary findByExerciseNameAndBodyPartName(String exerciseName, String bodyPartName);
}
