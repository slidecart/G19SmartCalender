package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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

    /**
     * Creates a new activity based on the provided request data.
     * Utilizes the currently authenticated user's details to associate the activity with the user.
     * If the user is not authenticated, an unauthorized response is returned.
     *
     * @param activity the details of the activity to be created, encapsulated in a CreateActivityRequest object
     * @return a ResponseEntity containing the created ActivityDTO and a status of 201 (Created) if successful,
     *         or a ResponseEntity with a status of 401 (Unauthorized) if the user is not authenticated
     */
    @PostMapping("/create")
    public ResponseEntity<?> createActivity(@Valid @RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(activityService.createActivity(activity, currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves all activities associated with the currently authenticated user.
     * If the user is authenticated, a list of activities is returned with a status of 200 (OK).
     * If the user is not authenticated, an unauthorized response is returned with a status of 401 (Unauthorized).
     *
     * @return a ResponseEntity containing a list of ActivityDTO objects and a status of 200 (OK) if the user is authenticated,
     *         or an empty ResponseEntity with a status of 401 (Unauthorized) if the user is not authenticated
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getAllActivities(currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    /**
     * Retrieves a specific activity by its unique identifier for the currently authenticated user.
     * The method checks the current user's authentication status, and fetches the activity data if authorized.
     * Returns a response based on whether the activity exists and the user's authentication status.
     *
     * @param id the unique identifier of the activity to be retrieved
     * @return a ResponseEntity containing the activity data with a status of 200 (OK) if the activity is found
     *         and the user is authenticated, a ResponseEntity with a status of 404 (Not Found) if the activity
     *         does not exist, or a ResponseEntity with a status of 401 (Unauthorized) if the user is not authenticated
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getActivity(id, currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Updates an existing activity for the currently authenticated user based on the provided activity details.
     * This method checks if the user is authenticated, retrieves the activity by its ID, and updates it
     * if it exists. Returns appropriate response statuses for different outcomes.
     *
     * @param id the unique identifier of the activity to be updated
     * @param activityDTO the details of the activity being updated, encapsulated in an ActivityDTO object
     * @return a ResponseEntity containing the updated ActivityDTO with a status of 200 (OK) if the update is
     *         successful, a ResponseEntity with a status of 404 (Not Found) if the activity does not exist, or
     *         a ResponseEntity with a status of 401 (Unauthorized) if the user is not authenticated
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editActivity(@PathVariable Long id, @Valid @RequestBody ActivityDTO activityDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.editActivity(currentUser, id, activityDTO));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


    /**
     * Deletes an activity identified by its unique ID for the currently authenticated user.
     * The method checks the authentication status of the user and delegates the deletion
     * process to the activity service. If the user is not authenticated, an unauthorized
     * response is returned.
     *
     * @param id the unique identifier of the activity to be deleted
     * @return a ResponseEntity indicating the result of the deletion process:
     *         a status of 200 (OK) if the deletion is successful,
     *         a status of 404 (Not Found) if the activity does not exist,
     *         or a status of 401 (Unauthorized) if the user is not authenticated
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return activityService.deleteActivity(currentUser, id);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves the list of ongoing activities for the currently authenticated user.
     * If the user is authenticated, the method fetches ongoing activities from the activity service
     * and returns them with an HTTP status of 200 (OK). If the user is not authenticated,
     * an HTTP status of 401 (Unauthorized) is returned.
     *
     * @return a ResponseEntity containing a list of ActivityDTO objects with a status of 200 (OK)
     *         if the user is authenticated, or an empty ResponseEntity with a status of 401 (Unauthorized)
     *         if the user is not authenticated
     */
    @GetMapping("/ongoing")
    public ResponseEntity<?> getOngoingActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getOngoingActivities(currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves a list of future activities for the currently authenticated user.
     * If the user is authenticated, the method fetches the future activities
     * using the activity service and returns them with an HTTP status of 200 (OK).
     * If the user is not authenticated, an HTTP status of 401 (Unauthorized) is returned.
     *
     * @return a ResponseEntity containing a list of ActivityDTO objects with a status of 200 (OK)
     *         if the user is authenticated, or an empty ResponseEntity with a status of 401 (Unauthorized)
     *         if the user is not authenticated
     */
    @GetMapping("/future")
    public ResponseEntity<?> getFutureActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getFutureActivities(currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves a list of activities for a specific category associated with the currently authenticated user.
     * If the user is authenticated, the method fetches activities belonging to the specified category using
     * the activity service and returns them with an HTTP status of 200 (OK). If the user is not authenticated,
     * an HTTP status of 401 (Unauthorized) is returned.
     *
     * @param categoryId the unique identifier of the category for which activities are to be retrieved
     * @return a ResponseEntity containing a list of ActivityDTO objects with a status of 200 (OK)
     *         if the user is authenticated, or an empty ResponseEntity with a status of 401 (Unauthorized)
     *         if the user is not authenticated
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getActivitiesByCategory(@PathVariable Long categoryId) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getActivitiesByCategory(currentUser, categoryId));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves activities for the currently authenticated user within the specified date range.
     * If the user is authenticated, the method fetches activities between the provided start and end dates
     * and returns them with an HTTP status of 200 (OK). If the user is not authenticated,
     * an HTTP status of 401 (Unauthorized) is returned.
     *
     * @param start the starting date of the range (inclusive), formatted as ISO date
     * @param end the ending date of the range (inclusive), formatted as ISO date
     * @return a ResponseEntity containing a list of ActivityDTO objects with a status of 200 (OK)
     *         if the user is authenticated, or an empty ResponseEntity with a status of 401 (Unauthorized)
     *         if the user is not authenticated
     */
    @GetMapping("/between")
    public ResponseEntity<?> getActivitiesBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(activityService.getActivitiesBetween(currentUser, start, end));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}