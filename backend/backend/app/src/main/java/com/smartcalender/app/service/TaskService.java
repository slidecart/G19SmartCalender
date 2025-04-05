package com.smartcalender.app.service;

import com.smartcalender.app.dto.ConvertTaskRequest;
import com.smartcalender.app.dto.TaskDTO;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.TaskRepository;
import com.smartcalender.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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

    public TaskDTO createTask(TaskDTO newTask, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task();
        task.setName(newTask.getName());
        task.setDescription(newTask.getDescription());
        task.setDate(newTask.getDate());
        task.setLocation(newTask.getLocation());
        task.setCompleted(newTask.isCompleted());
        task.setUser(user); // 🔐 Link to logged-in user

        Task savedTask = taskRepository.save(task);
        return new TaskDTO(savedTask);
    }

    public TaskDTO editTask(Long id, TaskDTO newTask, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(( ) -> new RuntimeException("User not found"));
        Task task = taskRepository.findByIdAndUser(id, user).orElseThrow(( ) -> new RuntimeException("Task not found"));

        task.setName(newTask.getName());
        task.setDescription(newTask.getDescription());
        task.setDate(newTask.getDate());
        task.setLocation(newTask.getLocation());
        task.setCompleted(newTask.isCompleted());

        Task updatedTask = taskRepository.save(task);
        return new TaskDTO(updatedTask);
    }

    public void deleteTask(Long id, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(( ) -> new RuntimeException("User not found"));
        Task task = taskRepository.findByIdAndUser(id, user).orElseThrow(( ) -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    public void toggleTaskCompletion(Long taskId, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(( ) -> new RuntimeException("User not found"));

        Task task = taskRepository.findByIdAndUser(taskId, user)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.toggleCompleted();
        taskRepository.save(task);
    }


    public Activity convertTaskToActivity(Long taskId, ConvertTaskRequest taskRequest, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(( ) -> new RuntimeException("User not found"));
        Task task = taskRepository.findByIdAndUser(taskId, user).orElseThrow(( ) -> new RuntimeException("Task not found"));

        Activity activity = new Activity();
        activity.setName(task.getName());
        activity.setDescription(task.getDescription());
        activity.setDate(task.getDate());
        activity.setLocation(task.getLocation());
        activity.setDate(taskRequest.getDate());
        activity.setStartTime(taskRequest.getStartTime());
        activity.setEndTime(taskRequest.getEndTime());
        activity.setUser(user);

        activityRepository.save(activity);
        taskRepository.delete(task);

        return activity;
    }

    public List<TaskDTO> getTasksForUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found")); //TODO - exception till user not found

        return taskRepository.findByUser(user).stream()
                .map(TaskDTO::new)
                .collect(Collectors.toList());
    }

    public TaskDTO getUserTaskById(Long id, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findByIdAndUser(id, user).orElseThrow(() -> new RuntimeException("Task not found"));

        return new TaskDTO(task);
    }

    public List<TaskDTO> getTasksByCategory(String categoryName, String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        Category category = categoryRepository.findByName(categoryName).orElseThrow(() -> new RuntimeException("Category not found"));
        List<Task> tasks = taskRepository.findByUserAndCategory(user, category);
        return tasks.stream().map(TaskDTO::new).collect(Collectors.toList());
    }
}
