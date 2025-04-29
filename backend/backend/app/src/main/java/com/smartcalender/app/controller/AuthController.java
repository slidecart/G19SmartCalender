package com.smartcalender.app.controller;

import com.smartcalender.app.dto.LoginRequest;
import com.smartcalender.app.dto.LoginResponseDTO;
import com.smartcalender.app.dto.RegisterRequest;
import com.smartcalender.app.dto.ResponseDTO;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.UserRepository;
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
    private final UserRepository userRepository;


    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        LoginResponseDTO response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> revokeToken(@RequestBody Map<String, UUID> requestBody) {
        UUID refreshToken = requestBody.get("refreshToken");
        authService.revokeRefreshToken(refreshToken);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam("email") String email) {
        try {
            authService.forgotPassword(email);
            return ResponseEntity.ok(new ResponseDTO("Länk för återställning av lösenord skickas till din e-post.", email));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseDTO(e.getMessage(), email));
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
        try {
            authService.resetPassword(token, newPassword);
            return ResponseEntity.ok(new ResponseDTO("Lösenordet har återställts."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        User user = authService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("uid") Long userId, @RequestParam("otp") String otp) {
        try {
            String userEmailAddress = authService.verifyEmail(userId, otp);
            return ResponseEntity.ok(new ResponseDTO("E-postadressen har verifierats.", userEmailAddress));
        } catch (RuntimeException e) {
            String userEmailAddress = userRepository.findById(userId)
                    .map(User::getEmailAddress)
                    .orElse(null);
            return ResponseEntity.badRequest().body(new ResponseDTO(e.getMessage(), userEmailAddress));
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<?> resendVerification(@RequestParam("email") String email) {
        try {
            authService.resendVerification(email);
            return ResponseEntity.ok(new ResponseDTO("Verifieringslänk skickad till din e-post.", email));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            @RequestBody Map<String, UUID> requestBody
    ) {
        UUID refreshToken = requestBody.get("refreshToken");
        LoginResponseDTO response =
                authService.refreshToken(refreshToken);
        return ResponseEntity.ok(response);
    }
}
