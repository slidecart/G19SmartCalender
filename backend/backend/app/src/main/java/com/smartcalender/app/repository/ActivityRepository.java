package com.smartcalender.app.repository;

import com.smartcalender.app.entity.Activity;
import com.smartcalender.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Optional<Activity> findByNameAndDate(String name, LocalDate date);

    Optional<Activity> findByIdAndUser(Long id, User currentUser);


    @Query("SELECT a FROM Activity a WHERE a.user.id = :userId AND a.date = :currentDate AND :currentTime BETWEEN a.startTime AND a.endTime")
    List<Activity> findOngoingActivities(@Param("userId") Long userId,
                                         @Param("currentDate") LocalDate currentDate,
                                         @Param("currentTime") LocalTime currentTime);

    @Query("SELECT a FROM Activity a WHERE a.date > :currentDate AND a.user.id = :userId")
    List<Activity> findUpcomingActivities(@Param("userId") Long userId,
                                          @Param("currentDate") LocalDate currentDate);

    List<Activity> findByUser(User user);

    List<Activity> findByCategoryIdAndUserId(Long categoryId, Long id);

    List<Activity> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

    List<Activity> findByUserAndNameContainingIgnoreCase(User user, String query);
}
