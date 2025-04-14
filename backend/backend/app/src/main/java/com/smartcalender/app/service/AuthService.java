package com.smartcalender.app.service;

import com.smartcalender.app.dto.LoginRequest;
import com.smartcalender.app.dto.LoginResponseDTO;
import com.smartcalender.app.dto.RegisterRequest;
import com.smartcalender.app.entity.RefreshToken;
import com.smartcalender.app.entity.User;
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
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

    @Value("${email-verification.required}")
    private boolean emailVerificationRequired;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;
    private final EmailService emailService;


    public AuthService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil, OtpService otpService, EmailService emailService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
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

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7)); // 7 days expiration
        refreshTokenRepository.save(refreshToken);

        return new LoginResponseDTO(accessToken, refreshToken.getId());
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

    @Scheduled(fixedRate = 604800000) // Every week
    public void deleteExpiredRefreshToken() {
        Instant now = Instant.now();
        refreshTokenRepository.deleteByExpirationBefore(now);
    }


    @Transactional
    public User registerUser(RegisterRequest request) {
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {throw new IllegalArgumentException("Username already exists.");
                });

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmailAddress());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User savedUser = userRepository.save(user);

        if (emailVerificationRequired) {
            String otp = otpService.generateAndStoreOtp(savedUser.getId());
            String verificationUrl = "http://localhost:8080/api/auth/verify?uid=" + savedUser.getId() + "&otp=" + otp;
            emailService.sendVerificationEmail(savedUser.getEmailAddress(), "Verify Your SmartCalendar Account", verificationUrl, otp);
        }

        return savedUser;
    }

    public void verifyEmail(Long userId, String otp) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (otpService.isOtpValid(userId, otp)) {
            user.setEmailVerified(true);
            userRepository.save(user);
            otpService.deleteOtp(userId);
        } else {
            throw new RuntimeException("Invalid or expired OTP");
        }
    }

    public void resendVerification(String emailAddress) {
        User user = userRepository.findByEmailAddress(emailAddress)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEmailVerified()) {
            String otp = otpService.generateAndStoreOtp(user.getId());
            String verificationUrl = "http://localhost:8080/api/auth/verify?uid=" + user.getId() + "&otp=" + otp;
            emailService.sendVerificationEmail(user.getEmailAddress(), "Verify Your SmartCalendar Account", verificationUrl, otp);
        } else {
            throw new RuntimeException("Email already verified");
        }
    }

}
