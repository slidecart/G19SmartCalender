package com.smartcalender.app.controller;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.ConvertTaskRequest;
import com.smartcalender.app.dto.TaskDTO;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<TaskDTO> tasks = taskService.getTasksForUser(username);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TaskDTO task = taskService.getUserTaskById(id, username);
        return ResponseEntity.ok(task);
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TaskDTO created = taskService.createTask(taskDTO, username);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> editTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TaskDTO updated = taskService.editTask(id, taskDTO, username);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDTO> deleteTask(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        taskService.deleteTask(id, username);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Void> toggleTaskCompletion(@PathVariable Long id){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        taskService.toggleTaskCompletion(id, username);
        return ResponseEntity.ok().build();
    }

    @GetMapping(params = "category")
    public ResponseEntity<List<TaskDTO>> getTasksByCategory(@RequestParam String category) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<TaskDTO> tasks = taskService.getTasksByCategory(category, username);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/api/tasks/{id}/convert")
    public ResponseEntity<ActivityDTO> convertTaskToActivity(@PathVariable Long id, @RequestBody @Valid ConvertTaskRequest taskRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Activity activity = taskService.convertTaskToActivity(id, taskRequest, username);
        return new ResponseEntity<>(new ActivityDTO(activity), HttpStatus.CREATED);
    }
}
