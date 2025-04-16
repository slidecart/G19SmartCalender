package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.UserRepository;
import com.smartcalender.app.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.activityService = activityService;
    }

    @PostMapping("/create")
    public ResponseEntity<ActivityDTO> createActivity(@RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        ActivityDTO created = activityService.createActivity(activity, currentUser);
        return new ResponseEntity<>(created, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ActivityDTO>> getAllActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        List<ActivityDTO> activities = activityService.getAllActivities(currentUser);
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDTO> getActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        return activityService.getActivity(id, currentUser)
                .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityDTO> editActivity(@PathVariable Long id, @RequestBody ActivityDTO activityDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        Optional<ActivityDTO> updatedActivity = activityService.editActivity(currentUser, id, activityDTO);
        return updatedActivity
                .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteActivity(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        return activityService.deleteActivity(currentUser, id);
    }

    @GetMapping("/ongoing")
    public ResponseEntity<List<ActivityDTO>> getOngoingActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        List<ActivityDTO> ongoing = activityService.getOngoingActivities(currentUser);
        return new ResponseEntity<>(ongoing, HttpStatus.OK);
    }

    @GetMapping("/future")
    public ResponseEntity<List<ActivityDTO>> getFutureActivities() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        List<ActivityDTO> ongoing = activityService.getFutureActivities(currentUser);
        return new ResponseEntity<>(ongoing, HttpStatus.OK);
    }
}