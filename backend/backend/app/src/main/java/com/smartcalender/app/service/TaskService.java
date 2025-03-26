package com.smartcalender.app.service;

import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired // Är också LIIITE oklar på vad denna annoteringen gör men w/e
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        if (!task.isValid()) {
            return null; //TODO - Exception-throw instead?
        }
        return taskRepository.save(task);
    }

    public void toggleTaskCompletion(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found")); //Förstår ej riktigt denna, intelliJ autofyllde en del
        task.toggleCompleted();
        taskRepository.save(task);
    }


    public Activity convertTaskToActivity(Long taskId, LocalDate date, LocalTime startTime, LocalTime endTime) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found")); //Samma här som ovan

        Activity activity = task.convertToActivity(date, startTime, endTime);
        return activity;
    }
}
