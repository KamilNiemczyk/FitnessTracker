package com.example.server.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Workout;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
