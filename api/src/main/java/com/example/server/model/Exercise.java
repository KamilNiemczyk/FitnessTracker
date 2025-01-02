package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer order_in_workout;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    @JsonBackReference
    private Workout workout;

    public Exercise() {
    }

    public Exercise(Integer order_in_workout) {
        this.order_in_workout = order_in_workout;
    }

    public Long getId() {
        return id;
    }

    public Integer getOrder_in_workout() {
        return order_in_workout;
    }

    public void setOrder_in_workout(Integer order_in_workout) {
        this.order_in_workout = order_in_workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    @Override
    public String toString() {
        return "Exercise{" +
                "id=" + id +
                ", order_in_workout=" + order_in_workout +
                '}';
    }
}
