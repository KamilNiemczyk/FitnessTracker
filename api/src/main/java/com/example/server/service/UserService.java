package com.example.server.service;


import com.example.server.model.Workout;
import com.example.server.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.server.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.server.security.JwtToken;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtToken jwtToken;
    public UserService(UserRepository userRepository, JwtToken jwtToken) {
        this.jwtToken = jwtToken;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }
    //
    public ResponseEntity<String> registerUser(User user) {
        User user1 = userRepository.findByEmail(user.getEmail());
        if (user1 != null) {
            logger.error("User already exists");
            return ResponseEntity.badRequest().body("User already exists");
        }else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            logger.info("User registered successfully");
            return ResponseEntity.ok("User registered successfully");
        }
    }

    public List<User> getAllUsers() {
        logger.info("Getting all users");
        return userRepository.findAll();
    }
    public ResponseEntity<String> login(User user) {
        User user1 = userRepository.findByEmail(user.getEmail());
        if (user1 != null && bCryptPasswordEncoder.matches(user.getPassword(), user1.getPassword())) {
            logger.info("User logged in successfully");
            String token = jwtToken.createToken(user.getEmail(), user1.getRole().toString(), user1.getId());
            return ResponseEntity.ok(token);
        }
        logger.error("Invalid username or password");
        return ResponseEntity.status(401).body("Invalid email or password");
    }
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
    public ResponseEntity<String> addWorkout(String token) {
        Long getId = jwtToken.validateToken(token).get("id", Long.class);
        User user = userRepository.findById(getId).orElse(null);
        if (user == null) {
            logger.error("User not found");
            return ResponseEntity.badRequest().body("User not found");
        }
        LocalDateTime now = LocalDateTime.now();
        user.addWorkout(new Workout(now));
        userRepository.save(user);
        return ResponseEntity.ok("Workout added successfully");
    }

    public List<Workout> getWorkouts(String token) {
        Long getId = jwtToken.validateToken(token).get("id", Long.class);
        User user = userRepository.findById(getId).orElse(null);
        if (user == null) {
            logger.error("User not found");
            return null;
        }
        return user.getWorkouts();
    }
}
