package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.ConvertTaskRequest;
import com.smartcalender.app.dto.TaskDTO;
import com.smartcalender.app.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getTasks() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<TaskDTO> tasks = taskService.getTasksForUser(currentUser);
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO task = taskService.getUserTaskById(id, currentUser);
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody @Valid TaskDTO taskDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO created = taskService.createTask(taskDTO, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editTask(@PathVariable Long id, @RequestBody @Valid TaskDTO taskDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO updated = taskService.editTask(id, taskDTO, currentUser);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            taskService.deleteTask(id, currentUser);
            return ResponseEntity.ok("Task deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> toggleTaskCompletion(@PathVariable Long id){
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO updated = taskService.toggleTaskCompletion(id, currentUser);
            return ResponseEntity.ok(updated);        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getTasksByCategory(@PathVariable Long categoryId) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<TaskDTO> tasks = taskService.getTasksByCategory(categoryId, currentUser);
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/{id}/convert")
    public ResponseEntity<?> convertTaskToActivity(@PathVariable Long id, @RequestBody @Valid ConvertTaskRequest taskRequest) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            ActivityDTO activity = taskService.convertTaskToActivity(id, taskRequest, currentUser);
            return ResponseEntity.ok(activity);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
