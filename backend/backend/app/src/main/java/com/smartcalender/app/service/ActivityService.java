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

    public List<ActivityDTO> getAllActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return activityRepository.findAll()
                .stream()
                .filter(activity -> activity.getUser().getId().equals(user.getId()))
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    public ActivityDTO createActivity(CreateActivityRequest request, UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

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
        activity.setUser(user);

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            activity.setCategory(category);
        }

        Activity savedActivity = activityRepository.save(activity);

        return activityMapper.toDto(savedActivity);
    }

    @Transactional
    public ResponseEntity<Boolean> deleteActivity(UserDetails currentUser, Long id) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Optional<Activity> activityOptional = activityRepository.findByIdAndUser(id, user);
        if (activityOptional.isPresent()) {
            activityRepository.delete(activityOptional.get());
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    public Optional<ActivityDTO> editActivity(UserDetails currentUser, Long id, ActivityDTO activityDTO) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Activity> activityOptional = activityRepository.findByIdAndUser(id, user);

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

            if (activityDTO.getUserId() != null && activityDTO.getUserId().equals(user.getId())) {
                activityToEdit.setUser(user);
            }

            Activity savedActivity = activityRepository.save(activityToEdit);
            return Optional.of(activityMapper.toDto(savedActivity));
        }
        return Optional.empty();
    }

    public Optional<ActivityDTO> getActivity(long id, UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return activityRepository.findByIdAndUser(id, user)
                .map(activityMapper::toDto);
    }

    public List<ActivityDTO> getOngoingActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        List<Activity> ongoingActivities = activityRepository.findOngoingActivities(user.getId(), currentDate, currentTime);
        return ongoingActivities.stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }


    public List<ActivityDTO> getFutureActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        LocalDate currentDate = LocalDate.now();

        return activityRepository.findUpcomingActivities(user.getId(), currentDate)
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }
}
