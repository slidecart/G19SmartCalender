package com.smartcalender.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table (name = "activity")
public class Activity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;
    private String description;
    private String location;

    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime startTime;
    @NotNull
    private LocalTime endTime;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Activity() {
    }

    public Activity(String name, String description, LocalDate date, LocalTime startTime, LocalTime endTime, String location, Category category) {
        this.name = name;
        this.description = description; //Can be null
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location; //Can be null
        this.category = category; //Can be default
    }

    public boolean isOnGoing() {
        LocalTime now = LocalTime.now();
        return now.isAfter(startTime) && now.isBefore(endTime);
    }

    public boolean isFuture() {
        return LocalDateTime.now().isBefore(LocalDateTime.of(date, startTime));
    }

    public long getDuration() {
        return Duration.between(startTime, endTime).toMinutes();
    }

    public boolean overlaps(Activity otherActivity) {
        if (!this.date.equals(otherActivity.date)) {
            return false;
        }
        return this.startTime.isBefore(otherActivity.endTime) &&
                this.endTime.isAfter(otherActivity.startTime);
    }

    @AssertTrue(message = "Start time must be before end time")
    public boolean isValidTimeRange() {
        return startTime.isBefore(endTime);
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
