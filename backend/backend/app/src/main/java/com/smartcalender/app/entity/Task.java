package com.smartcalender.app.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

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




}
