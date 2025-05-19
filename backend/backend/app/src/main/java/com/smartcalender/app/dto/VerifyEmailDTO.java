package com.smartcalender.app.dto;

import java.util.UUID;

public class VerifyEmailDTO {
    private String message;
    private String email;
    private String accessToken;
    private UUID refreshToken;

    public VerifyEmailDTO() {
    }

    public VerifyEmailDTO(String message, String email, String accessToken, UUID refreshToken) {
        this.message = message;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public UUID getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(UUID refreshToken) {
        this.refreshToken = refreshToken;
    }
}
