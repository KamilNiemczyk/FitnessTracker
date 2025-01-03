package com.example.server.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;

@Aspect
@Component
public class TokenValidationAspect {

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private HttpServletRequest request;

    @Before("@annotation(com.example.server.security.ValidateToken)")
    public void validateToken() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        try {
            Claims claims = jwtToken.validateToken(token);
            System.out.println("Token validated for user: " + claims.getSubject());
        } catch (JwtException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token", e);
        }
    }
}