package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.User;
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
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public ActivityController(ActivityService activityService, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.activityService = activityService;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<ActivityDTO> createActivity(@RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        ActivityDTO created = activityService.createActivity(activity, currentUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ActivityDTO>> getAllActivities() {
        List<ActivityDTO> activities = activityService.getAllActivities();
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDTO> getActivity(@PathVariable Long id) {
        return activityService.getActivity(id)
                .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActivityDTO> editActivity(@PathVariable Long id, @RequestBody ActivityDTO activityDTO) {
        Optional<ActivityDTO> updatedActivity = activityService.editActivity(id, activityDTO);
        return updatedActivity
                .map(activity -> new ResponseEntity<>(activity, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteActivity(@PathVariable Long id) {
        return activityService.deleteActivity(id);
    }

    @GetMapping("/ongoing")
    public ResponseEntity<List<ActivityDTO>> getOngoingActivities() {
        List<ActivityDTO> ongoing = activityService.getOngoingActivities();
        return new ResponseEntity<>(ongoing, HttpStatus.OK);
    }
}