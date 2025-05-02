package com.smartcalender.app.dto;

public class ChangeEmailRequest {
    private String newEmail;
    private String password;

    public ChangeEmailRequest() {
    }

    public ChangeEmailRequest(String newEmail, String password) {
        this.newEmail = newEmail;
        this.password = password;
    }

    public String getNewEmail() {
        return newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
