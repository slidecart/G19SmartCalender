package com.smartcalender.app.controller;

import com.smartcalender.app.dto.LoginRequest;
import com.smartcalender.app.dto.LoginResponseDTO;
import com.smartcalender.app.dto.RegisterRequest;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequest loginRequest) {
        LoginResponseDTO response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponseDTO> refreshToken(
            @RequestBody Map<String, UUID> requestBody
    ) {
        UUID refreshToken = requestBody.get("refreshToken");
        LoginResponseDTO response =
                authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> revokeToken(@RequestBody Map<String, UUID> requestBody) {
        UUID refreshToken = requestBody.get("refreshToken");
        authService.revokeRefreshToken(refreshToken);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest) {
        User user = authService.registerUser(registerRequest);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
