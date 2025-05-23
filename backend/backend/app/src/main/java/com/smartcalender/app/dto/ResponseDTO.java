package com.smartcalender.app.dto;

public class ResponseDTO {
    private String message;
    private String email;

    public ResponseDTO(String message) {
        this.message = message;
    }

    public ResponseDTO(String message, String email) {
        this.message = message;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
