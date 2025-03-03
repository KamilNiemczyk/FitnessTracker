package com.example.server.dto;

import com.example.server.model.ExerciseRecord;

import java.util.List;

public class CreateExerciseRequest {
    private Long workoutId;
    private Integer orderInWorkout;
    private Long exerciseDictionaryId;
    private List<NewRecordDto> records;


    public Long getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(Long workoutId) {
        this.workoutId = workoutId;
    }

    public Integer getOrderInWorkout() {
        return orderInWorkout;
    }

    public void setOrderInWorkout(Integer orderInWorkout) {
        this.orderInWorkout = orderInWorkout;
    }

    public Long getExerciseDictionaryId() {
        return exerciseDictionaryId;
    }

    public void setExerciseDictionaryId(Long exerciseDictionaryId) {
        this.exerciseDictionaryId = exerciseDictionaryId;
    }

    public List<NewRecordDto> getRecords() {
        return records;
    }

    public void setRecords(List<NewRecordDto> records) {
        this.records = records;
    }
}
