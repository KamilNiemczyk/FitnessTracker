package com.example.server.controller;

import com.example.server.dto.PasswordDto;
import com.example.server.model.Workout;
import com.example.server.security.ValidateToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.server.service.UserService;
import org.springframework.http.ResponseEntity;
import com.example.server.model.User;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

//    @ValidateToken
    @GetMapping("/all")
    public List<User> getAllUsers() {
        logger.info("Getting all users");
        return userService.getAllUsers();
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        return userService.login(user);
    }
    @DeleteMapping("/delete")
    public void deleteAllUsers() {
        userService.deleteAllUsers();
    }

    @ValidateToken
    @PostMapping("/add-workout")
    public ResponseEntity<String> addWorkout(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.addWorkout(token);
    }

    @ValidateToken
    @GetMapping("/workouts")
    public List<Workout> getWorkouts(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.getWorkouts(token);
    }

    @ValidateToken
    @GetMapping("/workout")
    public ResponseEntity<Workout> getWorkout(HttpServletRequest request, @RequestParam Long id) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.getWorkout(token, id);
    }

    @ValidateToken
    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        if(token == null) {
            return ResponseEntity.ok(false);
        }
        return userService.isAdmin(token);
    }

    @ValidateToken
    @DeleteMapping("/delete-workout")
    public ResponseEntity<String> deleteWorkout(HttpServletRequest request, @RequestParam Long id) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.deleteWorkout(token, id);
    }

    @ValidateToken
    @PutMapping("/password")
    public ResponseEntity<String> changePassword(HttpServletRequest request, @RequestBody PasswordDto newPassword) {
        String token = request.getHeader("Authorization").substring(7);
        return userService.changePassword(token, newPassword.getPassword());
    }

}
