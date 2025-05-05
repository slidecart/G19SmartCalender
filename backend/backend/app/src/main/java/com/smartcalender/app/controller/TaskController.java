package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.ConvertTaskRequest;
import com.smartcalender.app.dto.CreateTaskRequest;
import com.smartcalender.app.dto.TaskDTO;
import com.smartcalender.app.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * TaskController is a REST controller that provides endpoints for managing and retrieving tasks.
 * It allows users to perform CRUD operations on tasks such as creation, retrieval, updating, deletion and conversion
 * into activities. The controller also provides endpoint filters for tasks based on various criteria like time
 * periods or categories. It utilizes the TaskService to handle the business logic and interacts with the currently
 * authenticated user to ensure proper access control.
 * @author Isaac Löwenthaal Carter, Carl Lundholm, David Lexe
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Retrieves all tasks associated with the currently authenticated user.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @return a ResponseEntity containing a list of TaskDTO objects if the user is authenticated,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author David Lexe, Carl Lundholm
     */
    @GetMapping("/all")
    public ResponseEntity<?> getTasks() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<TaskDTO> tasks = taskService.getTasksForUser(currentUser);
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves a specific task associated with the currently authenticated user by its unique identifier.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @param id the unique identifier of the task to be retrieved
     * @return a ResponseEntity containing the TaskDTO object if the user is authenticated and authorized to access the task,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author David Lexe, Carl Lundholm, Isaac Löwenthaal Carter
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO task = taskService.getUserTaskById(id, currentUser);
            return ResponseEntity.ok(task);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Creates a new task for the currently authenticated user. The task details are provided
     * in the request body as a TaskDTO object. If the user is not authenticated, the request will
     * return an HTTP 401 Unauthorized status.
     *
     * @param createTaskRequest the CreateTaskRequest object containing the details of the task to be created
     * @return a ResponseEntity containing the created TaskDTO object if the task is successfully created,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author Carl Lundholm, David Lexe
     */
    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody @Valid CreateTaskRequest createTaskRequest) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO created = taskService.createTask(createTaskRequest, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Updates an existing task identified by its unique identifier with new details.
     * The details of the task to be updated are provided in the request body as a TaskDTO object.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @param id the unique identifier of the task to be updated
     * @param taskDTO the TaskDTO object containing the updated details of the task
     * @return a ResponseEntity containing the updated TaskDTO object if the update is successful and the user is authenticated,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author David Lexe, Carl Lundholm, Isaac Löwenthaal Carter
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editTask(@PathVariable Long id, @RequestBody @Valid TaskDTO taskDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO updated = taskService.editTask(id, taskDTO, currentUser);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Deletes a task identified by its unique identifier. The deletion is performed
     * only if the currently authenticated user is authorized to perform this operation.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @param id the unique identifier of the task to be deleted
     * @return a ResponseEntity containing a success message if the task is successfully deleted,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author Carl Lundholm, David Lexe
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {

            return taskService.deleteTask(id, currentUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Toggles the completion status of a task identified by its unique identifier.
     * The completion status is updated for the task belonging to the currently
     * authenticated user. If the user is not authenticated, the request will
     * return an HTTP 401 Unauthorized status.
     *
     * @param id the unique identifier of the task whose completion status is to be toggled
     * @return a ResponseEntity containing the updated TaskDTO object if the status is successfully toggled
     *         and the user is authenticated, or an HTTP 401 Unauthorized response if authentication fails
     * @author Carl Lundholm, David Lexe
     */
    @PutMapping("/{id}/complete")
    public ResponseEntity<?> toggleTaskCompletion(@PathVariable Long id){
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            TaskDTO updated = taskService.toggleTaskCompletion(id, currentUser);
            return ResponseEntity.ok(updated);        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves all tasks for a specific category that are associated with the currently authenticated user.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @param categoryId the unique identifier of the category for which tasks are to be retrieved
     * @return a ResponseEntity containing a list of TaskDTO objects if the user is authenticated,
     *         or an HTTP 401 Unauthorized response if authentication fails
     * @author David Lexe, Carl Lundholm
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getTasksByCategory(@PathVariable Long categoryId) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            List<TaskDTO> tasks = taskService.getTasksByCategory(categoryId, currentUser);
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Converts a task identified by its unique identifier into an activity.
     * The details required for the conversion are provided in the request body.
     * This operation is performed for the currently authenticated user.
     * If the user is not authenticated, the request will return an HTTP 401 Unauthorized status.
     *
     * @param id the unique identifier of the task to be converted
     * @param taskRequest the ConvertTaskRequest object containing the details needed for the conversion
     * @return a ResponseEntity containing the resulting ActivityDTO object if the conversion is successful
     *         and the user is authenticated, or an HTTP 401 Unauthorized response if authentication fails
     * @author Carl Lundholm, David Lexe
     */
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
