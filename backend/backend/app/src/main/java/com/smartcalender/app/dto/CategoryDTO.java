package com.smartcalender.app.dto;

import com.smartcalender.app.entity.Category;

public class CategoryDTO {
    private Long id;
    private String name;
    private String color;
    private String userId;

    public CategoryDTO() {
    }

    public CategoryDTO(Long id, String name, String color, String userId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.userId = userId;
    }

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.color = category.getColor();
        this.userId = category.getUser().getId().toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
