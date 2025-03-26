package com.smartcalender.app.service;

import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {
    private List<Activity> activities;

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

    public ResponseEntity<Boolean> deleteActivity(Activity activity) {
        activityRepository.delete(activity);
        return new ResponseEntity<>(true, HttpStatus.OK); //TODO - return-message should be based on if the database was successful or not
    }

    public ResponseEntity<Activity> editActivity(Activity activity) {
        Optional<Activity> activityOptional = activityRepository.findById(activity.getId());
        if (activityOptional.isPresent()) {
            Activity activityToEdit = activityOptional.get();

            activityToEdit.setName(activity.getName());
            activityToEdit.setDescription(activity.getDescription());
            activityToEdit.setStartTime(activity.getStartTime());
            activityToEdit.setEndTime(activity.getEndTime());
            activityRepository.save(activityToEdit);
            return new ResponseEntity<>(activity, HttpStatus.OK);
        }
        return null;
    }

    public Optional<Activity> getActivity(long id) {
        return activityRepository.findById(id);
    }

    public List<Activity> getOngoingActivities() {
        return activityRepository.findAll().stream()
                .filter(Activity::isOnGoing)
                .collect(Collectors.toList());
    }
}
