package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.*;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.service.ActivityService;
import com.smartcalender.app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final ActivityService activityService;
    private final Map<String, String> monthMap = Map.ofEntries(
            Map.entry("Jan", "01"),
            Map.entry("Feb", "02"),
            Map.entry("Mar", "03"),
            Map.entry("Apr", "04"),
            Map.entry("Maj", "05"),
            Map.entry("Jun", "06"),
            Map.entry("Jul", "07"),
            Map.entry("Aug", "08"),
            Map.entry("Sep", "09"),
            Map.entry("Okt", "10"),
            Map.entry("Nov", "11"),
            Map.entry("Dec", "12")
    );

    public UserController(UserService userService, ActivityService activityService) {
        this.userService = userService;
        this.activityService = activityService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserInformation() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            UserDTO user = userService.getUser(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

    }

    @GetMapping("/me/stats/tasks")
    public ResponseEntity<?> getTaskStats() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            TaskStatsDTO taskStatsDTO = userService.getTaskStats(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(taskStatsDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/me/stats/activities")
    public ResponseEntity<?> getActivityStats() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            ActivityStatsDTO activityStatsDTO = userService.getActivityStats(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(activityStatsDTO);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/me/profile-icon")
    public ResponseEntity<?> getProfileIcon() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            UserDTO profileIcon = userService.getProfileIcon(currentUser);
            return ResponseEntity.status(HttpStatus.OK).body(profileIcon);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/me/profile-icon")
    public ResponseEntity<?> setProfileIcon(@RequestBody UserDTO user) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            UserDTO updatedIcon = userService.setProfileIcon(currentUser, user.getProfileIcon());
            return ResponseEntity.status(HttpStatus.OK).body(updatedIcon);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchForActivitiesOrTasks(@RequestParam String query) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser != null) {
            SearchDTO searchResults = userService.searchForActivitiesOrTasks(currentUser, query);
            if (searchResults != null) {
                return ResponseEntity.status(HttpStatus.OK).body(searchResults);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO("Search results not found"));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/import/kronox")
    public ResponseEntity<?> importKronox(@RequestBody Map<String, String> requestBody) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            String url = requestBody.get("url");

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            String html = response.body();

            List<CreateActivityRequest> activities = new ArrayList<>();


            Pattern weekBlockPattern = Pattern.compile(
                    "Vecka\\s+(\\d+),\\s+(\\d{4})",
                    Pattern.DOTALL
            );
            Matcher weekBlockMatcher = weekBlockPattern.matcher(html);

            while (weekBlockMatcher.find()) {
                String weekBlockHtml = weekBlockMatcher.group(0);
                String year = weekBlockMatcher.group(2);

                Pattern rowPattern = Pattern.compile(
                        "<tr\\s+class=\"data-(?:white|grey)\">\\s*" +
                                "\\s*<td[^>]*>[^<]*</td>\\s*" +
                                "<td[^>]*>(\\d{1,2})\\s+(\\w{3})</td>\\s*" +
                                "<td[^>]*>(\\d{2}:\\d{2})[-–](\\d{2}:\\d{2})</td>\\s*" +
                                "<td[^>]*>([^<]*)</td>\\s*" +
                                "<td[^>]*>([^<]*)</td>\\s*" +
                                "<td[^>]*>([^<]*)</td>",
                        Pattern.DOTALL
                );


                System.out.println(weekBlockHtml);
                System.out.println("----------------------------------");
                Matcher matcher = rowPattern.matcher(weekBlockHtml);
                System.out.println(matcher.find());



                while (matcher.find()) {
                    String day = matcher.group(1);
                    String monthShort = matcher.group(2);
                    String start = matcher.group(3);
                    String end = matcher.group(4);
                    String title = matcher.group(5);
                    String location = matcher.group(6);
                    String teacher = matcher.group(7);

                    String month = monthMap.get(monthShort);
                    if (month == null) continue;

                    System.out.println(String.format("%s-%s-%02d", title, location, teacher, start, end));
                    String dateString = String.format("%s-%s-%02d", year, month, Integer.parseInt(day));
                    LocalDate date = LocalDate.parse(dateString);

                    CreateActivityRequest activity = new CreateActivityRequest();
                    activity.setName(title);
                    activity.setDate(date);
                    activity.setStartTime(LocalTime.parse(start));
                    activity.setEndTime(LocalTime.parse(end));
                    activity.setLocation(location);
                    activity.setDescription(teacher);

                    activities.add(activity);
                }
            }

            List<ActivityDTO> created = activityService.createActivitiesBatch(activities, currentUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Fel vid import: " + e.getMessage());
        }
    }
}