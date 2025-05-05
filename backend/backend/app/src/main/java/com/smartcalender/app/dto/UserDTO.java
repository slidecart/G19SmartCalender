package com.smartcalender.app.dto;

public class UserDTO {
    private Long id;
    private String username;
    private String emailAddress;
    private String profileIcon;

    public UserDTO() {
    }

    public UserDTO(String profileIcon) {
        this.profileIcon = profileIcon;
    }

    public UserDTO(Long id, String username, String emailAddress) {
        this.id = id;
        this.username = username;
        this.emailAddress = emailAddress;
    }

    public UserDTO(Long id, String username, String emailAddress, String profileIcon) {
        this.id = id;
        this.username = username;
        this.emailAddress = emailAddress;
        this.profileIcon = profileIcon;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getProfileIcon() {
        return profileIcon;
    }

    public void setProfileIcon(String profileIcon) {
        this.profileIcon = profileIcon;
    }
}
