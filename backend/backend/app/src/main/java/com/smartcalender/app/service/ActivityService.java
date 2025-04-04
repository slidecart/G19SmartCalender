package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.mapper.ActivityMapper;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ActivityMapper activityMapper;


    public ActivityService(ActivityRepository activityRepository, CategoryRepository categoryRepository, UserRepository userRepository, ActivityMapper activityMapper) {
        this.activityRepository = activityRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.activityMapper = activityMapper;
    }

    public List<ActivityDTO> getAllActivities() {
        return activityRepository.findAll()
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    public ActivityDTO createActivity(CreateActivityRequest request, UserDetails currentUser) {
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

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            activity.setCategory(category);
        }

        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        activity.setUser(user);

        Activity savedActivity = activityRepository.save(activity);

        return activityMapper.toDto(savedActivity);
    }

    @Transactional
    public ResponseEntity<Boolean> deleteActivity(Long id) {
        Optional<Activity> activity = activityRepository.findById(id);
        if (activity.isPresent()) {
            activityRepository.delete(activity.get());
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    public Optional<ActivityDTO> editActivity(Long id, ActivityDTO activityDTO) {
        Optional<Activity> activityOptional = activityRepository.findById(id);
        if (activityOptional.isPresent()) {
            Activity activityToEdit = activityOptional.get();

            activityToEdit.setName(activityDTO.getName());
            activityToEdit.setDescription(activityDTO.getDescription());
            activityToEdit.setDate(activityDTO.getDate());
            activityToEdit.setStartTime(activityDTO.getStartTime());
            activityToEdit.setEndTime(activityDTO.getEndTime());
            activityToEdit.setLocation(activityDTO.getLocation());

            if (activityDTO.getCategoryId() != null) {
                Category category = categoryRepository.findById(activityDTO.getCategoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + activityDTO.getCategoryId()));
                activityToEdit.setCategory(category);
            }

            if (activityDTO.getUserId() != null) {
                User user = userRepository.findById(activityDTO.getUserId())
                        .orElseThrow(() -> new RuntimeException("User not found with ID: " + activityDTO.getUserId()));
                activityToEdit.setUser(user);
            }

            Activity savedActivity = activityRepository.save(activityToEdit);
            return Optional.of(activityMapper.toDto(savedActivity));
        }
        return Optional.empty();
    }

    public Optional<ActivityDTO> getActivity(long id) {
        return activityRepository.findById(id)
                .map(activityMapper::toDto);
    }

    public List<ActivityDTO> getOngoingActivities() {
        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        List<Activity> ongoingActivities = activityRepository.findOngoingActivities(currentDate, currentTime);
        return ongoingActivities.stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }


    public List<Activity> getFutureActivities() {
        //Change code below to get only future activities
        return activityRepository.findAll();
    }
}
