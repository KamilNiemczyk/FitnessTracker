package com.example.server.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
public class ExerciseDictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bodyPartName;
    private String exerciseName;
    private Integer difficulty;

    @OneToMany(mappedBy = "exerciseDictionary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;

    public ExerciseDictionary() {
    }

    public ExerciseDictionary(String exercise_name, String body_part_name, Integer difficulty) {
        this.bodyPartName = body_part_name;
        this.exerciseName = exercise_name;
        this.difficulty = difficulty;
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
    public Integer getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }
}
