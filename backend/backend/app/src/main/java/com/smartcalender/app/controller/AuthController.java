package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.*;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.UserRepository;
import com.smartcalender.app.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            LoginResponseDTO response = authService.authenticateUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(new ResponseDTO(e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO("Invalid credentials"));
        }
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

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest requestBody) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            try {
                authService.changePassword(requestBody.getOldPassword(), requestBody.getNewPassword(), currentUser);
                return ResponseEntity.ok(new ResponseDTO("Lösenordet har ändrats."));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ResponseDTO("Error changing password: " + e.getMessage()));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        UserDTO user = authService.registerUser(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PutMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("uid") Long userId, @RequestParam("otp") String otp) {
         try {
            VerifyEmailDTO dto = authService.verifyEmail(userId, otp);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ResponseDTO(e.getMessage()));
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

    @PutMapping("/change-email")
    public ResponseEntity<?> changeEmail(@RequestBody ChangeEmailRequest requestBody) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            authService.changeEmail(requestBody.getNewEmail(), requestBody.getPassword(), currentUser);
            return ResponseEntity.ok(new ResponseDTO("E-postadressen har ändrats."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestBody DeleteAccountRequest request) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            authService.deleteAccount(request.getPassword(), currentUser);
            return ResponseEntity.ok(new ResponseDTO("Kontot har raderats."));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
