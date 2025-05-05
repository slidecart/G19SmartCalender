package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityStatsDTO;
import com.smartcalender.app.dto.TaskStatsDTO;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.TaskRepository;
import com.smartcalender.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ActivityRepository activityRepository;

    @Value("${email-verification.required}")
    private boolean emailVerificationRequired;

    public UserService(UserRepository userRepository, TaskRepository taskRepository, ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.activityRepository = activityRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (emailVerificationRequired && !user.isEmailVerified()) {
            throw new RuntimeException("Email not verified");
        }

        UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getUsername());
        builder.password(user.getPassword());
        builder.authorities("USER");

        return builder.build();
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
