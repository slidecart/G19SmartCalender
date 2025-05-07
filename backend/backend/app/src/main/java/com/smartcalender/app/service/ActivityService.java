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

/**
 * Service class responsible for managing activities.
 * Provides methods to create, retrieve, update, and delete activities associated with a user.
 */
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

    /**
     * Retrieves a list of all activities associated with the currently authenticated user.
     *
     * @param currentUser the details of the currently authenticated user
     * @return a list of {@code ActivityDTO} objects representing the user's activities
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
    public List<ActivityDTO> getAllActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return activityRepository.findAll()
                .stream()
                .filter(activity -> activity.getUser().getId().equals(user.getId()))
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }


    /**
     * Creates a new activity based on the provided request and associates it with the current user.
     * The activity details such as name, description, date, time, location, and optional category
     * are saved and returned in the form of an ActivityDTO.
     *
     * @param request the request object containing the details of the activity to be created
     * @param currentUser the details of the currently authenticated user creating the activity
     * @return an {@code ActivityDTO} object representing the created activity, including any
     * warnings about overlapping activities
     * @throws UserNotFoundException if the current user cannot be found in the system
     * @throws IllegalArgumentException if the specified category is not found
     */
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

    /**
     * Deletes an activity associated with the currently authenticated user.
     * The activity is identified by its unique ID and must belong to the user
     * making the request. If the activity is found and deleted successfully,
     * the method returns a positive response, otherwise, a not found response
     * is returned.
     *
     * @param currentUser the details of the currently authenticated user
     * @param id the unique identifier of the activity to be deleted
     * @return a {@code ResponseEntity} containing {@code true} if the activity
     *         was deleted successfully, or {@code false} if the activity was
     *         not found
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
    @Transactional
    public ResponseEntity<Boolean> deleteActivity(UserDetails currentUser, Long id) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        Optional<Activity> activityOptional = activityRepository.findByIdAndUser(id, user);
        if (activityOptional.isPresent()) {
            activityRepository.delete(activityOptional.get());
            return ResponseEntity.status(HttpStatus.OK).body(true);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
    }

    /**
     * Edits an existing activity associated with the currently authenticated user.
     * The activity is identified by its unique ID and is updated with the details
     * provided in the ActivityDTO. The method verifies user authorization, validates
     * category existence if specified, and checks for overlapping activities.
     *
     * @param currentUser the details of the currently authenticated user
     * @param id the unique identifier of the activity to be edited
     * @param activityDTO the data transfer object containing updated activity details
     * @return an Optional containing the updated ActivityDTO, including any warnings
     *         about overlapping activities, if the activity was successfully edited;
     *         otherwise, an empty Optional if the activity is not found or not accessible
     *         by the current user
     * @throws UserNotFoundException if the current user cannot be found in the system
     * @throws RuntimeException if the specified category is not found
     */
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

    /**
     * Retrieves a specific activity associated with the given ID for the current authenticated user.
     *
     * @param id the unique identifier of the activity to be retrieved
     * @param currentUser the details of the currently authenticated user
     * @return an Optional containing the {@code ActivityDTO} object if the activity is found
     *         and belongs to the current user; an empty Optional otherwise
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
    public Optional<ActivityDTO> getActivity(long id, UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return activityRepository.findByIdAndUser(id, user)
                .map(activityMapper::toDto);
    }

    /**
     * Retrieves a list of ongoing activities for the currently authenticated user.
     *
     * @param currentUser the details of the currently authenticated user
     * @return a list of {@code ActivityDTO} objects representing the user's ongoing activities
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
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


    /**
     * Retrieves a list of future activities for the currently authenticated user.
     *
     * @param currentUser the details of the currently authenticated user
     * @return a list of {@code ActivityDTO} objects representing the user's future activities
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
    public List<ActivityDTO> getFutureActivities(UserDetails currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        LocalDate currentDate = LocalDate.now();

        return activityRepository.findUpcomingActivities(user.getId(), currentDate)
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of activities belonging to a specific category for the currently authenticated user.
     *
     * @param currentUser the details of the currently authenticated user
     * @param categoryId the unique identifier of the category to filter activities by
     * @return a list of {@code ActivityDTO} objects representing the activities in the specified category
     *         for the authenticated user
     * @throws UserNotFoundException if the current user cannot be found in the system
     */
    public List<ActivityDTO> getActivitiesByCategory(UserDetails currentUser, Long categoryId) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return activityRepository.findByCategoryIdAndUserId(categoryId, user.getId())
                .stream()
                .map(activityMapper::toDto)
                .collect(Collectors.toList());
    }

  /**
   * Retrieves a list of activity DTOs for the given user filtered by the specified date range.
   *
   * @param currentUser the details of the currently authenticated user
   * @param start the start date (inclusive) for filtering activities
   * @param end the end date (inclusive) for filtering activities
   * @return a list of activity DTOs within the specified date range
   * @throws UserNotFoundException if the current user cannot be found
   */
  public List<ActivityDTO> getActivitiesBetween(UserDetails currentUser, LocalDate start, LocalDate end) {
      User user = userRepository.findByUsername(currentUser.getUsername())
              .orElseThrow(() -> new UserNotFoundException("User not found"));
      return activityRepository.findByUserAndDateBetween(user, start, end)
              .stream()
              .map(activityMapper::toDto)
              .collect(Collectors.toList());
  }

    /**
     * Checks for overlapping activities for a given user and activity, excluding a specific activity ID if provided.
     * If overlaps are detected, warning messages are generated describing the conflicts.
     *
     * @param activity the activity to check for overlaps
     * @param user the user whose activities are to be checked for potential overlaps
     * @param excludeId an optional ID of the activity to exclude from the overlap check
     * @return a list of warning messages indicating overlapping activities, or an empty list if no overlaps are found
     */
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
