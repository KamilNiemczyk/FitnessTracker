package com.example.server.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ExerciseDictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bodyPartName;
    private String exerciseName;

    public ExerciseDictionary() {
    }

    public ExerciseDictionary(String body_part_name, String exercise_name) {
        this.bodyPartName = body_part_name;
        this.exerciseName = exercise_name;
    }

    public Long getId() {
        return id;
    }

    public String getBodyPartName() {
        return bodyPartName;
    }

    public void setBodyPartName(String body_part_name) {
        this.bodyPartName = body_part_name;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exercise_name) {
        this.exerciseName = exercise_name;
    }
}
