package com.example.server.repository;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.model.Exercise;
@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long>{
}
