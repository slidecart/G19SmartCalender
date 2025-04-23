package com.smartcalender.app.service;

import com.smartcalender.app.dto.CategoryDTO;
import com.smartcalender.app.dto.CreateCategoryRequest;
import com.smartcalender.app.entity.Category;
import com.smartcalender.app.entity.User;
import com.smartcalender.app.exception.UserNotFoundException;
import com.smartcalender.app.repository.CategoryRepository;
import com.smartcalender.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CategoryDTO createCategory(CreateCategoryRequest categoryRequest, UserDetails currentUser) {
        User user = getUser(currentUser);

        if (categoryRepository.findByName(categoryRequest.getName()).isPresent()) {
            throw new IllegalArgumentException("Category already exists");
        } else {
            Category category = new Category();
            category.setName(categoryRequest.getName());
            category.setColor(categoryRequest.getColor());
            category.setUser(user);

            categoryRepository.save(category);
            return new CategoryDTO(category);
        }
    }

    @Transactional
    public void deleteCategory(Long id, UserDetails currentUser) {
        User user = getUser(currentUser);

        Category category = getTask(id, user);

        categoryRepository.delete(category);
    }

    @Transactional
    public CategoryDTO editCategory(Long id, CategoryDTO UpdatedCategory, UserDetails currentUser) {
        User user = getUser(currentUser);

        Category category = getTask(id, user);

        category.setName(UpdatedCategory.getName() != null ? UpdatedCategory.getName() : category.getName());
        category.setColor(UpdatedCategory.getColor() != null ? UpdatedCategory.getColor() : category.getColor());
        categoryRepository.save(category);
        return new CategoryDTO(category);
    }

    public List<CategoryDTO> getAllCategories(UserDetails currentUser) {
        User user = getUser(currentUser);

        return categoryRepository.findByUser(user).stream()
                .map(CategoryDTO::new)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long categoryId, UserDetails currentUser) {
        User user = getUser(currentUser);

        return new CategoryDTO(getTask(categoryId, user));
    }

    private Category getTask(Long id, User currentUser) {
        return categoryRepository.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }

    private User getUser(UserDetails currentUser) {
        return userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

}
