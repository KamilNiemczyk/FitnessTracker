package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("startTime")
    private LocalDateTime startTime;

    @JsonProperty("workoutDuration")
    private Duration workoutDuration;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Exercise> exercises;

    public Workout() {
        this.exercises = new ArrayList<>();
    }

    public Workout(LocalDateTime startTime) {
        this.startTime = startTime;
        this.workoutDuration = Duration.ofMinutes(0);
        this.exercises = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Duration getWorkoutDuration() {
        return workoutDuration;
    }

    public void setWorkoutDuration(Duration workoutDuration) {
        this.workoutDuration = workoutDuration;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void addExercise(Exercise exercise) {
        exercise.setWorkout(this);
        this.exercises.add(exercise);
    }

    @Override
    public String toString() {
        return "Workout{" +
                "id=" + id +
                ", start_time=" + startTime +
                ", workout_duration=" + workoutDuration +
                ", user_id=" + (user != null ? user.getId() : "null") +
                '}';
    }
}
