package com.smartcalender.app.repository;

import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.Task;
import com.smartcalender.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    Optional<Task> findByIdAndUser(Long id, User user);
    List<Task> findByUserAndCategory(User user, Category category);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.id = :id AND t.user = :user")
    long deleteByIdAndUser(@Param("id") Long id, @Param("user") User user);}
