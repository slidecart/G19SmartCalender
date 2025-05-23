package com.smartcalender.app.repository;

import com.smartcalender.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmailAddress(String emailAddress);

    boolean existsByEmailAddress(String newEmail);
}