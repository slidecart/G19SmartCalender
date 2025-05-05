package com.smartcalender.app.service;

import com.smartcalender.app.dto.LoginRequest;
import com.smartcalender.app.dto.LoginResponseDTO;
import com.smartcalender.app.dto.RegisterRequest;
import com.smartcalender.app.entity.PasswordResetToken;
import com.smartcalender.app.entity.RefreshToken;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.PasswordResetTokenRepository;
import com.smartcalender.app.repository.RefreshTokenRepository;
import com.smartcalender.app.repository.UserRepository;
import com.smartcalender.app.config.JwtUtil;
import jakarta.transaction.Transactional;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Value("${email-verification.required}")
    private boolean emailVerificationRequired;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;
    private final EmailService emailService;


    public AuthService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository, PasswordResetTokenRepository passwordResetTokenRepository,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil, OtpService otpService, EmailService emailService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @Transactional
    public LoginResponseDTO authenticateUser(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();

        String accessToken = jwtUtil.generateToken(userDetails);

        RefreshToken refreshToken = refreshTokenRepository.findByUserAndExpiresAtAfter(user, Instant.now())
                .orElseGet(() -> {
                    RefreshToken newToken = new RefreshToken();
                    newToken.setUser(user);
                    newToken.setExpiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7)); // 7 days expiration
                    refreshTokenRepository.save(newToken);
                    return newToken;
                });

        return new LoginResponseDTO(accessToken, refreshToken.getId());
    }

    @Transactional
    public void forgotPassword(String email) {
        User user = userRepository.findByEmailAddress(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Generate a unique token
        String token = UUID.randomUUID().toString();

        // Create and save the password reset token
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(Instant.now().plusSeconds(3600)); // 1 hour expiration
        passwordResetTokenRepository.save(resetToken);

        // Create the reset URL
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;

        // Send the email
        emailService.sendPasswordResetEmail(user.getEmailAddress(), "Reset Your SmartCalendar Password", resetUrl);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        // Find the reset token
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired token"));

        // Check if the token has expired
        if (resetToken.getExpiryDate().isBefore(Instant.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }

        // Get the user and update the password
        User user = resetToken.getUser();
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the reset token
        passwordResetTokenRepository.delete(resetToken);
    }


    //TODO Change the return User-class to a DTO class response
    @Transactional
    public User registerUser(RegisterRequest request) {
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {throw new IllegalArgumentException("Username already exists.");
                });

        userRepository.findByEmailAddress(request.getEmailAddress())
                .ifPresent(user -> {throw new IllegalArgumentException("Email address already exists.");
                });

        if (request.getPassword() == null || request.getPassword().length() < 8 || !request.getPassword().matches(".*[A-Z].*") || !request.getPassword().matches(".*[0-9].*")) {
            throw new ValidationException("Password must be at least 8 characters long, contain at least one uppercase letter and one number.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmailAddress());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User savedUser = userRepository.save(user);

        if (emailVerificationRequired) {
            String otp = otpService.generateAndStoreOtp(savedUser.getId());
            String verificationUrl = "http://localhost:3000/verify-email?uid=" + savedUser.getId() + "&otp=" + otp;
            emailService.sendVerificationEmail(savedUser.getEmailAddress(), "Verify Your SmartCalendar Account", verificationUrl, otp);
        }

        return savedUser;
    }

    @Transactional
    public String verifyEmail(Long userId, String otp) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isEmailVerified()) {
            throw new RuntimeException("E-postadressen är redan verifierad");
        }

        if (!otpService.isOtpValid(userId, otp)) {
            throw new RuntimeException("Ogiltigt otp");
        }

            user.setEmailVerified(true);
            userRepository.save(user);
            otpService.deleteOtp(userId);
            return user.getEmailAddress();
    }

    @Transactional
    public void resendVerification(String emailAddress) {
        User user = userRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEmailVerified()) {
            String otp = otpService.generateAndStoreOtp(user.getId());
            String verificationUrl = "http://localhost:3000/verify-email?uid=" + user.getId() + "&otp=" + otp;
            emailService.sendVerificationEmail(user.getEmailAddress(), "Verify Your SmartCalendar Account", verificationUrl, otp);
        } else {
            throw new RuntimeException("Email already verified");
        }
    }

    public LoginResponseDTO refreshToken(UUID refreshToken) {
        final var refreshTokenEntity = refreshTokenRepository
                .findByIdAndExpiresAtAfter(refreshToken, Instant.now())
                .orElseThrow(() -> new ValidationException("Invalid or expired refresh token"));

        User user = refreshTokenEntity.getUser();

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();

        final var newAccessToken = jwtUtil.generateToken(userDetails);

        return new LoginResponseDTO(newAccessToken, refreshToken);
    }

    public void revokeRefreshToken(UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    @Scheduled(fixedRate = 86400000) // Every day
    public void deleteExpiredRefreshToken() {
        Instant now = Instant.now();
        refreshTokenRepository.deleteByExpirationBefore(now);
    }
}
