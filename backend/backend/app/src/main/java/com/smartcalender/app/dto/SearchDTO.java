package com.smartcalender.app.dto;

public class SearchDTO {
    private String searchText;
    private ActivityDTO[] activity;
    private TaskDTO[] task;

    public SearchDTO() {
    }

    public SearchDTO(String searchText, ActivityDTO[] activities, TaskDTO[] tasks) {
        this.searchText = searchText;
        this.activity = activities;
        this.task = tasks;
    }

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public ActivityDTO[] getActivity() {
        return activity;
    }

    public void setActivity(ActivityDTO[] activity) {
        this.activity = activity;
    }

    public TaskDTO[] getTask() {
        return task;
    }

    public void setTask(TaskDTO[] task) {
        this.task = task;
    }
}
