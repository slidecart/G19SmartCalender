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
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository,
                       AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
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


    @Transactional
    public User registerUser(RegisterRequest request) {
        userRepository.findByUsername(request.getUsername())
                .ifPresent(user -> {throw new IllegalArgumentException("Username already exists.");
                });

        User user = new User();
        user.setUsername(request.getUsername());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }
}
