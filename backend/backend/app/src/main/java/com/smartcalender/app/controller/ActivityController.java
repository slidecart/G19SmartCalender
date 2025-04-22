package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.UserRepository;
import com.smartcalender.app.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * ActivityController is a REST controller that provides endpoints for managing and retrieving activities.
 * It allows users to perform CRUD operations on activities such as creation, retrieval, updating, and deletion.
 * The controller also provides endpoint filters for activities based on various criteria like time periods or categories.
 * It utilizes the ActivityService to handle the business logic and interacts with the currently authenticated user
 * to ensure proper access control.
 */
@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;


    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createActivity(@Valid @RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            ActivityDTO created = activityService.createActivity(activity, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getAllActivities(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(activities);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return activityService.getActivity(id, currentUser)
                    .map(activity -> ResponseEntity.status(HttpStatus.OK).body(activity))
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editActivity(@PathVariable Long id, @Valid @RequestBody ActivityDTO activityDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            Optional<ActivityDTO> updatedActivity = activityService.editActivity(currentUser, id, activityDTO);
            return updatedActivity
                    .map(activity -> ResponseEntity.status(HttpStatus.OK).body(activity))
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return activityService.deleteActivity(currentUser, id);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/ongoing")
    public ResponseEntity<?> getOngoingActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> ongoing = activityService.getOngoingActivities(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(ongoing);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    @GetMapping("/future")
    public ResponseEntity<?> getFutureActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> ongoing = activityService.getFutureActivities(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(ongoing);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getActivitiesByCategory(@PathVariable Long categoryId) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getActivitiesByCategory(currentUser, categoryId);
            return ResponseEntity.status(HttpStatus.OK).body(activities);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/between")
    public ResponseEntity<?> getActivitiesBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getActivitiesBetween(currentUser, start, end);
            return ResponseEntity.status(HttpStatus.OK).body(activities);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}