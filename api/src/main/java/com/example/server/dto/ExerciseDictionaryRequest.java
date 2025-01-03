package com.example.server.dto;

public class ExerciseDictionaryRequest {
    private Long exerciseId;
    private Long exerciseDictionaryId;

    public Long getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(Long exerciseId) {
        this.exerciseId = exerciseId;
    }

    public Long getExerciseDictionaryId() {
        return exerciseDictionaryId;
    }

    public void setExerciseDictionaryId(Long exerciseDictionaryId) {
        this.exerciseDictionaryId = exerciseDictionaryId;
    }
}
