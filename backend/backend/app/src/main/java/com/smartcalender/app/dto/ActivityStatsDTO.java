package com.smartcalender.app.dto;

public class ActivityStatsDTO {
    private int totalActivitiesThisWeek;
    private int totalActivitiesThisMonth;
    private int averageHoursPerWeek;
    private int totalActivitiesToday;

    public ActivityStatsDTO(int totalActivitiesToday, int totalActivitiesThisWeek, int totalActivitiesThisMonth, int averageHoursPerWeek) {
        this.totalActivitiesThisWeek = totalActivitiesThisWeek;
        this.totalActivitiesThisMonth = totalActivitiesThisMonth;
        this.averageHoursPerWeek = averageHoursPerWeek;
        this.totalActivitiesToday = totalActivitiesToday;
    }

    public int getTotalActivitiesThisWeek() {
        return totalActivitiesThisWeek;
    }

    public void setTotalActivitiesThisWeek(int totalActivitiesThisWeek) {
        this.totalActivitiesThisWeek = totalActivitiesThisWeek;
    }

    public int getTotalActivitiesThisMonth() {
        return totalActivitiesThisMonth;
    }

    public void setTotalActivitiesThisMonth(int totalActivitiesThisMonth) {
        this.totalActivitiesThisMonth = totalActivitiesThisMonth;
    }

    public int getAverageHoursPerWeek() {
        return averageHoursPerWeek;
    }

    public void setAverageHoursPerWeek(int averageHoursPerWeek) {
        this.averageHoursPerWeek = averageHoursPerWeek;
    }

    public int getTotalActivitiesToday() {
        return totalActivitiesToday;
    }

    public void setTotalActivitiesToday(int totalActivitiesToday) {
        this.totalActivitiesToday = totalActivitiesToday;
    }
}
