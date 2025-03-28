package com.smartcalender.app.service;

import com.smartcalender.app.entity.User;
import com.smartcalender.app.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

   private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
