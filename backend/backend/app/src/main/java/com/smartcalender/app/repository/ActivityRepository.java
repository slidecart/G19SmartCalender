package com.smartcalender.app.repository;

import com.smartcalender.app.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

//public interface ActivityRepository extends JpaRepository<Activity, Long> {
//}

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    Optional<Activity> findByNameAndDate(String name, LocalDate date);

    @Query("SELECT a FROM Activity a WHERE a.date = :currentDate AND :currentTime BETWEEN a.startTime AND a.endTime")
    List<Activity> findOngoingActivities(@Param("currentTime") LocalTime currentTime);
}
