package com.smartcalender.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configures Spring Security for the SmartCalender application.
 * This class defines the security policies, including URL-based access control,
 * stateless session management, and JWT authentication integration.
 * It leverages Spring Security’s HttpSecurity to enforce authentication and authorization
 * while ensuring the application remains stateless, aligning with RESTful API best practices.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures the security filter chain for HTTP requests in the application.
     * This method sets up Spring Security’s HttpSecurity to:
     * - Enable CORS for cross-origin requests, using default settings.
     * - Disable CSRF protection since the application uses stateless JWT authentication.
     * - Define authorization rules for specific endpoints:
     *   - Public access to authentication-related endpoints (e.g., login, register).
     *   - Role-based access for admin endpoints.
     *   - Require authentication for all other requests.
     * - Enforce stateless session management to align with JWT-based authentication.
     * - Integrate a custom JwtAuthenticationFilter to validate tokens before Spring Security’s
     *   default authentication filter.
     *
     * @param http the HttpSecurity configuration object provided by Spring Security
     * @return the configured SecurityFilterChain for request processing
     * @throws Exception if an error occurs during security configuration
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login",
                                "/api/auth/verify",
                                "/api/auth/forgot-password",
                                "/api/auth/reset-password",
                                "/api/auth/resend-verification").permitAll()
                        .requestMatchers("/api/auth/refresh-token").permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /**
     * Provides a password encoder bean for secure password hashing.
     * This method configures BCryptPasswordEncoder, a strong, adaptive hashing algorithm,
     * to ensure passwords are securely stored and verified during authentication.
     *
     * @return a PasswordEncoder instance using BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Provides an AuthenticationManager bean for handling authentication requests.
     * This method integrates with Spring Security’s AuthenticationConfiguration to supply
     * an AuthenticationManager, which is essential for processing login requests and
     * validating user credentials in conjunction with the application’s UserDetailsService.
     *
     * @param authenticationConfiguration the configuration object for authentication setup
     * @return the AuthenticationManager instance for credential validation
     * @throws Exception if an error occurs during AuthenticationManager creation
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Provides a JwtAuthenticationFilter bean for JWT-based request authentication.
     * This method creates an instance of JwtAuthenticationFilter, which is added to Spring Security’s
     * filter chain to validate JWT tokens and authenticate users for each request.
     *
     * @return a JwtAuthenticationFilter instance
     */
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}