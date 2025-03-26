package com.smartcalender.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.Duration;
import java.time.LocalDate;
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

    public long getDuration() {
        return Duration.between(startTime, endTime).toMinutes();
    }

    public boolean overlaps(Activity otherActivity) {
        return this.date.equals(otherActivity.date) && (this.endTime.equals(otherActivity.endTime) && this.startTime.equals(otherActivity.startTime));
    }

    public Long getId() {
        return id;
    }
}
