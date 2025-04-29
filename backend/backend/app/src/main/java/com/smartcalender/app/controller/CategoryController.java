package com.smartcalender.app.controller;

import com.smartcalender.app.auth.SecurityUtils;
import com.smartcalender.app.dto.CategoryDTO;
import com.smartcalender.app.dto.CreateCategoryRequest;
import com.smartcalender.app.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for managing category-related operations in the SmartCalendar application.
 * This class provides API endpoints for creating, retrieving, editing, and deleting categories
 * associated with the currently authenticated user. All endpoints require user authentication
 * and ensure that the operations are restricted to the authenticated user's context.
 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Retrieves all categories associated with the currently authenticated user.
     * If the user is authenticated, this method fetches all categories tied to the user's account.
     * If no authenticated user is found, it returns an HTTP 401 Unauthorized response.
     *
     * @return a ResponseEntity containing the list of categories associated with the authenticated user,
     *         or an HTTP 401 Unauthorized response if the user is not authenticated
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllCategories() {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(categoryService.getAllCategories(currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Retrieves a specific category by its ID for the currently authenticated user.
     * If the user is authenticated, this method fetches and returns the category associated
     * with the given ID and tied to the user's account. If no authenticated user is present,
     * it returns an HTTP 401 Unauthorized response.
     *
     * @param id the ID of the category to retrieve
     * @return a ResponseEntity containing the requested category if the user is authenticated,
     *         or an HTTP 401 Unauthorized response if no user is authenticated
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(categoryService.getCategoryById(id, currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Creates a new category for the currently authenticated user.
     * If the user is authenticated, it processes the provided category details
     * and saves the new category to the database. If no authenticated user is found,
     * it returns an HTTP 401 Unauthorized response.
     *
     * @param request the details of the category to create, including name, color, and userId
     * @return a ResponseEntity containing the created category details if successful,
     *         or an HTTP 401 Unauthorized response if the user is not authenticated
     */
    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody CreateCategoryRequest request) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(request, currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Edits an existing category for the currently authenticated user.
     * If the user is authenticated, this method updates the category with the specified ID
     * using the provided category details. If no authenticated user is found, it returns
     * an HTTP 401 Unauthorized response.
     *
     * @param id the ID of the category to edit
     * @param categoryDTO the new details of the category to update
     * @return a ResponseEntity containing the updated category details if successful,
     *         or an HTTP 401 Unauthorized response if the user is not authenticated
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            return ResponseEntity.ok(categoryService.editCategory(id, categoryDTO, currentUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Deletes a category identified by its ID for the currently authenticated user.
     * If the user is authenticated, this method removes the category associated with
     * the given ID and tied to the user's account. If no authenticated user is found,
     * it returns an HTTP 401 Unauthorized response.
     *
     * @param id the ID of the category to delete
     * @return a ResponseEntity with HTTP 200 OK if the category is successfully deleted,
     *         or an HTTP 401 Unauthorized response if the user is not authenticated
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        UserDetails currentUser = SecurityUtils.getCurrentUser();
        if (currentUser != null) {
            categoryService.deleteCategory(id, currentUser);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
