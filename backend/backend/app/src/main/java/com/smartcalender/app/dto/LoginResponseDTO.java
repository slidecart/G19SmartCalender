package com.smartcalender.app.dto;

import java.util.UUID;

public class LoginResponseDTO {
    private String accessToken;
    private UUID refreshToken;

    public LoginResponseDTO(String accessToken, UUID refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public UUID getRefreshToken() {
        return refreshToken;
    }
}
