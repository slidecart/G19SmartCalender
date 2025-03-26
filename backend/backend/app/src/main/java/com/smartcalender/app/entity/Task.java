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


    public Task() {
    }

    public Task(Long id, String name, String description, LocalDate date, String location, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date; //Can be null
        this.location = location; //Can be null
        this.completed = false;
        this.category = category;
    }


    public void toggleCompleted() {
        this.completed = !this.completed;
    }

    public Activity convertToActivity(LocalDate date, LocalTime startTime, LocalTime endTime) {
        if (startTime == null || endTime == null) {
            return null;
        }
        if (startTime.isBefore(endTime)) {
            return null;
        }
        if (date == null) {
            this.date = date;
        }
        return new Activity(this.name, this.description, this.date, startTime, endTime, this.location, this.category);
    }

    //Hjälpmetod
    public boolean isValid() {
        return name != null && !name.trim().isEmpty() && date != null;
    }


}
