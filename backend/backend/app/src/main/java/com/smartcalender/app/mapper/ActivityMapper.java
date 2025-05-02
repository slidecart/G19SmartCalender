package com.smartcalender.app.mapper;

import com.smartcalender.app.dto.ActivityDTO;
import com.smartcalender.app.entity.Activity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ActivityMapper {

    public ActivityDTO toDto(Activity activity) {
        ActivityDTO dto = new ActivityDTO();
        dto.setId(activity.getId());
        dto.setName(activity.getName());
        dto.setDescription(activity.getDescription());
        dto.setLocation(activity.getLocation());
        dto.setDate(activity.getDate());
        dto.setStartTime(activity.getStartTime());
        dto.setEndTime(activity.getEndTime());
        dto.setCategoryId(activity.getCategory() != null ? activity.getCategory().getId() : null);
        dto.setCategoryName(activity.getCategory() != null ? activity.getCategory().getName() : null);
        dto.setCategoryColor(activity.getCategory() != null ? activity.getCategory().getColor() : null);
        dto.setUserId(activity.getUser() != null ? activity.getUser().getId() : null);
        dto.setUserName(activity.getUser() != null ? activity.getUser().getUsername() : null);
        dto.setDuration(activity.getDuration());
        dto.setFuture(activity.isFuture());
        dto.setOnGoing(activity.isOnGoing());
        dto.setValidTimeRange(activity.isValidTimeRange());
        dto.setWarnings(new ArrayList<>());

        return dto;
    }
}