package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    private LocalDateTime start_time;
    private Duration workout_duration;

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

    public Workout(LocalDateTime start_time) {
        this.start_time = start_time;
        this.workout_duration = Duration.ofMinutes(0);
        this.exercises = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getStart_time() {
        return start_time;
    }

    public void setStart_time(LocalDateTime start_time) {
        this.start_time = start_time;
    }

    public Duration getWorkout_duration() {
        return workout_duration;
    }

    public void setWorkout_duration(Duration workout_duration) {
        this.workout_duration = workout_duration;
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
                ", start_time=" + start_time +
                ", workout_duration=" + workout_duration +
                ", user_id=" + (user != null ? user.getId() : "null") +
                '}';
    }
}
