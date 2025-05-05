package com.smartcalender.app.controller;

import com.smartcalender.app.dto.TaskStatsDTO;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me/stats/tasks")
    public ResponseEntity<TaskStatsDTO> getTaskStats() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TaskStatsDTO taskStatsDTO = userService.getTaskStats(username);
        return new ResponseEntity<>(taskStatsDTO, HttpStatus.OK);
    }
}
