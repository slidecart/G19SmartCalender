package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.exception.UserNotFoundException;
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
import java.util.ArrayList;
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
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return activityRepository.findAll()
                .stream()
                .filter(activity -> activity.getUser().getId().equals(user.getId()))
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ActivityDTO createActivity(CreateActivityRequest request, UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        
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
        ActivityDTO activityDTO = activityMapper.toDto(savedActivity);

        List<String> warnings = checkForOverlaps(savedActivity, user, savedActivity.getId());
        activityDTO.setWarnings(warnings);

        return activityDTO;
    }

    @Transactional
    public ResponseEntity<Boolean> deleteActivity(UserDetails currentUser, Long id) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        Optional<Activity> activityOptional = activityRepository.findByIdAndUser(id, user);
        if (activityOptional.isPresent()) {
            activityRepository.delete(activityOptional.get());
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    @Transactional
    public Optional<ActivityDTO> editActivity(UserDetails currentUser, Long id, ActivityDTO activityDTO) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

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

            Activity savedActivity = activityRepository.save(activityToEdit);
            ActivityDTO updatedDTO = activityMapper.toDto(savedActivity);

            List<String> warnings = checkForOverlaps(savedActivity, user, id);
            updatedDTO.setWarnings(warnings);

            return Optional.of(updatedDTO);
        }
        return Optional.empty();
    }

    public Optional<ActivityDTO> getActivity(long id, UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return activityRepository.findByIdAndUser(id, user)
                .map(activityMapper::toDto);
    }

    public List<ActivityDTO> getOngoingActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        LocalDate currentDate = LocalDate.now();
        LocalTime currentTime = LocalTime.now();

        List<Activity> ongoingActivities = activityRepository.findOngoingActivities(user.getId(), currentDate, currentTime);
        return ongoingActivities.stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }


    public List<ActivityDTO> getFutureActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        LocalDate currentDate = LocalDate.now();

        return activityRepository.findUpcomingActivities(user.getId(), currentDate)
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ActivityDTO> getActivitiesByCategory(UserDetails currentUser, Long categoryId) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return activityRepository.findByCategoryIdAndUserId(categoryId, user.getId())
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ActivityDTO> getActivitiesBetween(UserDetails currentUser, LocalDate start, LocalDate end) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return activityRepository.findByUserAndDateBetween(user, start, end)
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    private List<String> checkForOverlaps(Activity activity, User user, Long excludeId) {
        List<Activity> userActivities = activityRepository.findByUser(user);
        List<String> warnings = new ArrayList<>();

        for (Activity existing : userActivities) {
            if (!userActivities.isEmpty() && (!existing.getId().equals(excludeId)) &&
                    activity.getDate().equals(existing.getDate()) &&
                    (activity.getStartTime().isBefore(existing.getEndTime()) && activity.getEndTime().isAfter(existing.getStartTime()))) {
                warnings.add("This activity overlaps with '" + existing.getName() + "' on " + existing.getDate() +
                        " from " + existing.getStartTime() + " to " + existing.getEndTime());
            }
        }
        return warnings;
    }
}
