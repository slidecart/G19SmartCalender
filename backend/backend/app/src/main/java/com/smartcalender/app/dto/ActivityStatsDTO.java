package com.smartcalender.app.dto;

public class ActivityStatsDTO {
    private int totalThisWeek;
    private int totalThisMonth;
    private int averageHoursPerWeek;
    private int totalToday;

    public ActivityStatsDTO(int totalToday, int totalThisWeek, int totalThisMonth, int averageHoursPerWeek) {
        this.totalThisWeek = totalThisWeek;
        this.totalThisMonth = totalThisMonth;
        this.averageHoursPerWeek = averageHoursPerWeek;
        this.totalToday = totalToday;
    }

    public int getTotalThisWeek() {
        return totalThisWeek;
    }

    public void setTotalThisWeek(int totalThisWeek) {
        this.totalThisWeek = totalThisWeek;
    }

    public int getTotalThisMonth() {
        return totalThisMonth;
    }

    public void setTotalThisMonth(int totalThisMonth) {
        this.totalThisMonth = totalThisMonth;
    }

    public int getAverageHoursPerWeek() {
        return averageHoursPerWeek;
    }

    public void setAverageHoursPerWeek(int averageHoursPerWeek) {
        this.averageHoursPerWeek = averageHoursPerWeek;
    }

    public int getTotalToday() {
        return totalToday;
    }

    public void setTotalToday(int totalToday) {
        this.totalToday = totalToday;
    }
}
