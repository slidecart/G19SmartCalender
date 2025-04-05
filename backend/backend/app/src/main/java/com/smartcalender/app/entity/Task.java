package com.smartcalender.app.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private LocalDate date;
    private String location;
    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Task() {
    }

    public Task(String name, String description, LocalDate date, String location, Category category) {
        this.name = name;
        this.description = description; // Can be null
        this.date = date; //Can be null
        this.location = location; //Can be null
        this.completed = false;
        this.category = category; //Can be default
    }


    public void toggleCompleted() {
        this.completed = !this.completed;
    }

    public Activity convertToActivity(LocalDate date, LocalTime startTime, LocalTime endTime) {
        if (startTime == null || endTime == null) {
            return null; // Exception-throw?
        }
        if (startTime.isBefore(endTime)) {
            return null; // Exception-throw?
        }
        if (date == null) { //
            this.date = date;
        }
        return new Activity(this.name, this.description, this.date, startTime, endTime, this.location, this.category);
    }

    //Hjälpmetod
    public boolean isValid() {
        return name != null && !name.trim().isEmpty() && date != null;
    }


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setUser(User user) {
    }
}
