package com.smartcalender.app.repository;

import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByUser(User user);
    Optional<Category> findByIdAndUser(Long id, User user);
    Optional<Category> findByNameAndUser(String name, User user);
}
