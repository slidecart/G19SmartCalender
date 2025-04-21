package com.smartcalender.app.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Utility class for accessing security-related information in the SmartCalender application.
 * Provides methods to interact with Spring Security’s context, enabling retrieval of the
 * currently authenticated user’s details for use in business logic and API endpoints.
 */
public class SecurityUtils {

    /**
     * Retrieves the currently authenticated user’s details from Spring Security’s context.
     * This method accesses the SecurityContextHolder to obtain the Authentication object,
     * extracts the principal if it is an instance of UserDetails, and returns it for use in
     * user-specific operations. It returns null if no authenticated user is present, ensuring
     * safe handling in scenarios where authentication is optional or not yet established.
     *
     * @return the UserDetails of the currently authenticated user, or null if none exists
     */
    public static UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            return (UserDetails) authentication.getPrincipal();
        }
        return null;
    }
}