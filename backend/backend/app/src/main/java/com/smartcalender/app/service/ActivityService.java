package com.smartcalender.app.service;

import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;


    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity createActivity(CreateActivityRequest request, UserDetails currentUser) {
        if (activityRepository.findByNameAndDate(request.getName(), request.getDate()).isPresent()) {
            throw new IllegalArgumentException("Activity already exists");
        }
        Activity activity = new Activity();
        activity.setName(request.getName());
        activity.setDescription(request.getDescription());
        activity.setDate(request.getDate());
        activity.setStartTime(request.getStartTime());
        activity.setEndTime(request.getEndTime());
        activity.setLocation(request.getLocation());
        User user = userRepository.findByUsername(currentUser.getUsername()).get();
        activity.setUser(user);

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
