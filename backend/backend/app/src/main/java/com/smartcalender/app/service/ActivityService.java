package com.smartcalender.app.service;

import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.repository.ActivityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;


    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity createActivity(Activity activity) {
        if (activityRepository.findByNameAndDate(activity.getName(), activity.getDate()).isPresent()) {
            throw new IllegalArgumentException("Activity already exists");
        }
        return activityRepository.save(activity);
    }

    public ResponseEntity<Boolean> deleteActivity(Long id) {
        if (activityRepository.existsById(id)) {
            activityRepository.deleteById(id);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
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
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    public Optional<Activity> getActivity(long id) {
        return activityRepository.findById(id);
    }

    public List<Activity> getOngoingActivities() {
        return activityRepository.findOngoingActivities(LocalTime.now());
    }

    public List<Activity> getFutureActivities() {
        //Change code below to get only future activities
        return activityRepository.findAll();
    }
}
