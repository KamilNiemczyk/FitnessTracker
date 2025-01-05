package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
public class ExerciseRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer reps;
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    @JsonBackReference
    private Exercise exercise;

    public ExerciseRecord() {
    }

    public ExerciseRecord(Integer weight, Integer reps) {
        this.reps = reps;
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
}
