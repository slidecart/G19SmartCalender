package com.smartcalender.app.config;

import com.smartcalender.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * A Spring Security filter that authenticates incoming HTTP requests using JWT tokens.
 * This filter intercepts each request, extracts a JWT token from the Authorization header,
 * validates it, and updates Spring Security’s context with the authenticated user if valid.
 * It extends OncePerRequestFilter to ensure it runs exactly once per request, optimizing performance
 * in Spring Boot’s filter chain.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userDetailsService;

    /**
     * Filters each HTTP request to enforce JWT-based authentication within Spring Security.
     * This method extracts the JWT token from the "Authorization" header, validates it using JwtUtil,
     * and, if valid, constructs an authentication token to store in Spring Security’s SecurityContextHolder.
     * It leverages Spring Boot’s dependency injection for JwtUtil and UserService to perform token validation
     * and user lookup, ensuring seamless integration with the application’s security configuration.
     *
     * The filter operates as follows:
     * 1. Checks for a "Bearer " token in the Authorization header.
     * 2. Extracts the username from the token using JwtUtil.
     * 3. Loads user details via UserService if no authentication exists in the current context.
     * 4. Validates the token against the user details and, if successful, sets the authentication in the SecurityContextHolder.
     * 5. Passes the request to the next filter in the chain, maintaining Spring Boot’s request processing flow.
     *
     * @param request     the incoming HTTP request containing headers and context
     * @param response    the HTTP response to be sent back to the client
     * @param filterChain the chain of filters to continue processing the request
     * @throws ServletException if a servlet-related error disrupts filter execution
     * @throws IOException      if an I/O error occurs while processing the request or response
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            username = jwtUtil.extractUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}