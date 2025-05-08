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

    public CreateCategoryRequest() {
    }

    public CreateCategoryRequest(String name, String color) {
        this.name = name;
        this.color = color;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }
}
