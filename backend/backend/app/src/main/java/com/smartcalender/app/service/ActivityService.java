package com.smartcalender.app.service;

import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity createActivity(Activity activity) {
        //List<Activity> existingActivities = activityRepository.findById(activity.getId());
        //Couldn't really piece this together.

        return activityRepository.save(activity);
    }

    public List<Activity> getOngoingActivities() {
        return activityRepository.findAll().stream()
                .filter(Activity::isOnGoing)
                .collect(Collectors.toList());
    }
}
