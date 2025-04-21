package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.ConvertTaskRequest;
import com.smartcalender.app.dto.TaskDTO;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.exception.UserNotFoundException;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.TaskRepository;
import com.smartcalender.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final CategoryRepository categoryRepository;


    public TaskService(TaskRepository taskRepository, UserRepository userRepository, ActivityRepository activityRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public TaskDTO createTask(TaskDTO newTask, UserDetails currentUser) {
        User user = getUser(currentUser);

        Task task = new Task();
        task.setName(newTask.getName());
        task.setDescription(newTask.getDescription());
        task.setDate(newTask.getDate());
        task.setLocation(newTask.getLocation());
        task.setCompleted(newTask.isCompleted());
        task.setUser(user);

        if (newTask.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndUser(newTask.getCategoryId(), user)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            task.setCategory(category);
        }

        Task savedTask = taskRepository.save(task);
        return new TaskDTO(savedTask);
    }

    @Transactional
    public TaskDTO editTask(Long id, TaskDTO newTask, UserDetails currentUser) {
        User user = getUser(currentUser);
        Task taskToEdit = getTask(id, user);

        taskToEdit.setName(newTask.getName());
        taskToEdit.setDescription(newTask.getDescription());
        taskToEdit.setDate(newTask.getDate());
        taskToEdit.setLocation(newTask.getLocation());
        taskToEdit.setCompleted(newTask.isCompleted());

        if (newTask.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndUser(newTask.getCategoryId(), user)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            taskToEdit.setCategory(category);
        }

        Task updatedTask = taskRepository.save(taskToEdit);
        return new TaskDTO(updatedTask);
    }

    @Transactional
    public void deleteTask(Long id, UserDetails currentUser) {
        User user = getUser(currentUser);
        long deletedCount = taskRepository.deleteByIdAndUser(id, user);
        if (deletedCount == 0) {
            throw new RuntimeException("Task not found");
        }
    }

    public TaskDTO toggleTaskCompletion(Long id, UserDetails currentUser) {
        User user = getUser(currentUser);
        Task taskToEdit = getTask(id, user);

        taskToEdit.toggleCompleted();
        taskRepository.save(taskToEdit);
        return new TaskDTO(taskToEdit);
    }


    public ActivityDTO convertTaskToActivity(Long id, ConvertTaskRequest taskRequest, UserDetails currentUser) {
        User user = getUser(currentUser);
        Task task = getTask(id, user);

        if (taskRequest.getStartTime() == null || taskRequest.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time must be provided");
        }
        if (taskRequest.getStartTime().isAfter(taskRequest.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before or equal to end time");
        }
        if (taskRequest.getDate() == null) {
            if (task.getDate() == null) {
                throw new IllegalArgumentException("Date must be provided");
            } else {
                taskRequest.setDate(task.getDate());
            }
        }

        Activity activity = new Activity();
        activity.setName(task.getName());
        activity.setDescription(task.getDescription());
        activity.setLocation(task.getLocation());
        activity.setDate(taskRequest.getDate());
        activity.setStartTime(taskRequest.getStartTime());
        activity.setEndTime(taskRequest.getEndTime());
        activity.setUser(user);

        if (task.getCategory() != null) {
            Category category = categoryRepository.findByIdAndUser(task.getCategory().getId(), user)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            activity.setCategory(category);
        }

        activityRepository.save(activity);
        return new ActivityDTO(activity);
    }

    public List<TaskDTO> getTasksForUser(UserDetails currentUser) {
        User user = getUser(currentUser);

        return taskRepository.findByUser(user).stream()
                .map(TaskDTO::new)
                .collect(Collectors.toList());
    }

    public TaskDTO getUserTaskById(Long id, UserDetails currentUser) {
        User user = getUser(currentUser);
        Task task = getTask(id, user);

        return new TaskDTO(task);
    }

    public List<TaskDTO> getTasksByCategory(long categoryId, UserDetails currentUser) {
        User user = getUser(currentUser);

        Category category = categoryRepository.findByIdAndUser(categoryId, user)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Task> tasks = taskRepository.findByUserAndCategory(user, category);
        return tasks.stream().map(TaskDTO::new).collect(Collectors.toList());
    }

    private Task getTask(Long id, User currentUser) {
        return taskRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    private User getUser(UserDetails currentUser) {
        return userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
