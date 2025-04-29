package com.smartcalender.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateCategoryRequest {

    @NotNull
    @NotBlank
    private String name;
    @NotNull
    @NotBlank
    private String color;
    @NotNull
    @NotBlank
    private Long userId;

    public CreateCategoryRequest() {
    }

    public CreateCategoryRequest(String name, String color, Long userId) {
        this.name = name;
        this.color = color;
        this.userId = userId;
    }

    public @NotNull String getName() {
        return name;
    }

    public @NotNull void setName(String name) {
        this.name = name;
    }

    public @NotNull String getColor() {
        return color;
    }

    public @NotNull void setColor(String color) {
        this.color = color;
    }

    public @NotNull Long getUserId() {
        return userId;
    }

    public @NotNull void setUserId(Long userId) {
        this.userId = userId;
    }
}
