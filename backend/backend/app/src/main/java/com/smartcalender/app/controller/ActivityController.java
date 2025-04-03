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
    public ResponseEntity<Activity> createActivity(@RequestBody CreateActivityRequest activity) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        Activity created = activityService.createActivity(activity, currentUser);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/all")
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
    public ResponseEntity<Activity> editActivity(@PathVariable Long id, @RequestBody ActivityDTO activityDTO) {
        Optional<Activity> existingActivity = activityService.getActivity(id);
        if (existingActivity.isPresent()) {
            Activity activityToUpdate = existingActivity.get();
            activityToUpdate.setName(activityDTO.getName());
            activityToUpdate.setDescription(activityDTO.getDescription());
            activityToUpdate.setDate(activityDTO.getDate());
            activityToUpdate.setStartTime(activityDTO.getStartTime());
            activityToUpdate.setEndTime(activityDTO.getEndTime());
            activityToUpdate.setLocation(activityDTO.getLocation());

            if (activityDTO.getCategoryId() != null) {
                Category category = categoryRepository.findById(activityDTO.getCategoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + activityDTO.getCategoryId()));
                activityToUpdate.setCategory(category);
            }

            if (activityDTO.getUserId() != null) {
                User user = userRepository.findById(activityDTO.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found with ID: " + activityDTO.getUserId()));
                activityToUpdate.setUser(user);
            }
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