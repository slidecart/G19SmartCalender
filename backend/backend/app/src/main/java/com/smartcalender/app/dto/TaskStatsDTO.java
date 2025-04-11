package com.smartcalender.app.dto;

public class TaskStatsDTO {
    private int totalTasks;
    private int completedTasks;
    private int activeTasks;

    public TaskStatsDTO() {
    }

    public TaskStatsDTO(int totalTasks, int completedTasks, int activeTasks) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.activeTasks = activeTasks;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(int completedTasks) {
        this.completedTasks = completedTasks;
    }

    public int getActiveTasks() {
        return activeTasks;
    }

    public void setActiveTasks(int activeTasks) {
        this.activeTasks = activeTasks;
    }
}
