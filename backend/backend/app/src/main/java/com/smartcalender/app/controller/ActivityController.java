package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.config.JwtUtil;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        Activity created = activityService.createActivity(activity, currentUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivity(@PathVariable Long id) {
        return activityService.getActivity(id)
                .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> editActivity(@PathVariable Long id, @RequestBody Activity activity) {
        Optional<Activity> existingActivity = activityService.getActivity(id);
        if (existingActivity.isPresent()) {
            Activity activityToUpdate = existingActivity.get();
            activityToUpdate.setName(activity.getName());
            activityToUpdate.setDescription(activity.getDescription());
            activityToUpdate.setDate(activity.getDate());
            activityToUpdate.setStartTime(activity.getStartTime());
            activityToUpdate.setEndTime(activity.getEndTime());
            activityToUpdate.setLocation(activity.getLocation());
            activityToUpdate.setCategory(activity.getCategory());
            activityToUpdate.setUser(activity.getUser());
            return activityService.editActivity(activityToUpdate);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteActivity(@PathVariable Long id) {
        return activityService.deleteActivity(id);
    }

    @GetMapping("/ongoing")
    public ResponseEntity<List<Activity>> getOngoingActivities() {
        List<Activity> ongoing = activityService.getOngoingActivities();
        return new ResponseEntity<>(ongoing, HttpStatus.OK);
    }
}