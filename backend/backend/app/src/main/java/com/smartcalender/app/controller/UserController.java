package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.*;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserInformation() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            UserDTO user = userService.getUser(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    @GetMapping("/me/stats/tasks")
    public ResponseEntity<?> getTaskStats() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            TaskStatsDTO taskStatsDTO = userService.getTaskStats(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(taskStatsDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/me/stats/activities")
    public ResponseEntity<?> getActivityStats() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            ActivityStatsDTO activityStatsDTO = userService.getActivityStats(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(activityStatsDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/me/profile-icon")
    public ResponseEntity<?> getProfileIcon() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            UserDTO profileIcon = userService.getProfileIcon(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(profileIcon);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/me/profile-icon")
    public ResponseEntity<?> setProfileIcon(@RequestBody UserDTO user) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            UserDTO updatedIcon = userService.setProfileIcon(currentUser, user.getProfileIcon());
            return ResponseEntity.status(HttpStatus.OK).body(updatedIcon);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchForActivitiesOrTasks(@RequestParam String query) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            SearchDTO searchResults = userService.searchForActivitiesOrTasks(currentUser, query);
            if (searchResults != null) {
                return ResponseEntity.status(HttpStatus.OK).body(searchResults);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO("Search results not found"));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}