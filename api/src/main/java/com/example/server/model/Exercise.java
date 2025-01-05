package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer orderInWorkout;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    @JsonBackReference
    private Workout workout;

    @ManyToOne
    @JoinColumn(name = "exercise_dictionary_id")
    private ExerciseDictionary exerciseDictionary;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ExerciseRecord> exerciseRecords;


    public Exercise() {
        this.exerciseRecords = new ArrayList<>();
    }

    public Exercise(Integer order_in_workout) {
        this.orderInWorkout = order_in_workout;
        this.exerciseRecords = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public Integer getOrderInWorkout() {
        return orderInWorkout;
    }

    public void setOrderInWorkout(Integer order_in_workout) {
        this.orderInWorkout= order_in_workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public void setExerciseDictionary(ExerciseDictionary exerciseDictionary) {
        this.exerciseDictionary = exerciseDictionary;
    }

    public ExerciseDictionary getExerciseDictionary() {
        return exerciseDictionary;
    }

    public List<ExerciseRecord> getExerciseRecords() {
        return exerciseRecords;
    }

    public void addExerciseRecord(ExerciseRecord exerciseRecord) {
        exerciseRecord.setExercise(this);
        this.exerciseRecords.add(exerciseRecord);
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "id=" + id +
                ", order_in_workout=" + orderInWorkout +
                '}';
    }
}
