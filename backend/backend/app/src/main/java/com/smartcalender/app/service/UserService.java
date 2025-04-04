package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityStatsDTO;
import com.smartcalender.app.dto.TaskStatsDTO;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.TaskRepository;
import com.smartcalender.app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class UserService {

   private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;
    private final TaskRepository taskRepository;
    private final ActivityRepository activityRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TaskRepository taskRepository, ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.taskRepository = taskRepository;
        this.activityRepository = activityRepository;
    }

    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public TaskStatsDTO getTaskStats(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<Task> tasks = taskRepository.findByUser(user);

        int total = tasks.size();
        int completed = (int) tasks.stream().filter(Task::isCompleted).count();
        int active = total - completed;

        return new TaskStatsDTO(total, completed, active);

    }

    public ActivityStatsDTO getActivityStats(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        List<Activity> activities = activityRepository.findByUser(user);
        LocalDate today = LocalDate.now();
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        YearMonth thisMonth = YearMonth.from(today);


        //TODO - Fastnade helt här i att detta var fucking svårt att dra ut. wow.
        return new ActivityStatsDTO(1, 1, 1);//TODO - placeholders
    }
}
