package com.smartcalender.app.service;

import com.smartcalender.app.dto.RegisterRequest;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER") // Lägg till roller dynamiskt om du har dem i databasen
                .build();
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