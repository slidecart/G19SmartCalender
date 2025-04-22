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
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getAllActivities(currentUser);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return activityService.getActivity(id, currentUser)
                    .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editActivity(@PathVariable Long id, @Valid @RequestBody ActivityDTO activityDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            Optional<ActivityDTO> updatedActivity = activityService.editActivity(currentUser, id, activityDTO);
            return updatedActivity
                    .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                    .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return activityService.deleteActivity(currentUser, id);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/ongoing")
    public ResponseEntity<?> getOngoingActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> ongoing = activityService.getOngoingActivities(currentUser);
            return new ResponseEntity<>(ongoing, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/future")
    public ResponseEntity<?> getFutureActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> ongoing = activityService.getFutureActivities(currentUser);
            return new ResponseEntity<>(ongoing, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getActivitiesByCategory(@PathVariable Long categoryId) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getActivitiesByCategory(currentUser, categoryId);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/between")
    public ResponseEntity<?> getActivitiesBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<ActivityDTO> activities = activityService.getActivitiesBetween(currentUser, start, end);
            return new ResponseEntity<>(activities, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}