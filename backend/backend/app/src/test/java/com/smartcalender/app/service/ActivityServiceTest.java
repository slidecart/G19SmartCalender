package com.smartcalender.app.service;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.dto.CreateActivityRequest;
import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.repository.ActivityRepository;
import com.smartcalender.app.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ActivityServiceTest {

    @Mock
    private ActivityRepository activityRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ActivityService activityService;

    @Test
    public void testCreateActivity() {
        UserDetails currentUser = new User("username", "password",
                new ArrayList<>());

        CreateActivityRequest createRequest = new CreateActivityRequest();
        createRequest.setName("Testing Activity");
        createRequest.setDate(LocalDate.now());
        createRequest.setStartTime(LocalTime.now());
        createRequest.setEndTime(LocalTime.now());
        createRequest.setLocation("Test Location");

        when(activityRepository.findByNameAndDate(any(), any()))
                .thenReturn(Optional.empty());

        when(userRepository.findByUsername(any()))
                .thenReturn(Optional.of(new com.smartcalender.app.entity.User()));

        when(activityRepository.save(any(Activity.class)))
                .thenAnswer(i -> i.getArguments()[0]);

        ActivityDTO activity = activityService.createActivity(createRequest, currentUser);

        assertNotNull(activity);
        assertEquals(createRequest.getName(), activity.getName());
        verify(activityRepository, times(1))
                .findByNameAndDate(createRequest.getName(), createRequest.getDate());
        verify(userRepository, times(1)).findByUsername(currentUser.getUsername());
        verify(activityRepository, times(1)).save(any(Activity.class));
    }

    @Test
    public void testCreateActivityAlreadyExists() {
        UserDetails currentUser = new User("username", "password",
                new ArrayList<>());

        CreateActivityRequest createRequest = new CreateActivityRequest();
        createRequest.setName("Testing Activity");
        createRequest.setDate(LocalDate.now());
        createRequest.setStartTime(LocalTime.now());
        createRequest.setEndTime(LocalTime.now());
        createRequest.setLocation("Test Location");

        when(activityRepository.findByNameAndDate(any(), any()))
                .thenReturn(Optional.of(new Activity()));

        assertThrows(IllegalArgumentException.class, () ->
                        activityService.createActivity(createRequest, currentUser),
                "Expected IllegalArgumentException to be thrown when creating an activity with a name and date that already exists in the database");
    }
}