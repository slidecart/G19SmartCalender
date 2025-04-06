package com.smartcalender.app.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Objects;
import java.util.UUID;

@Service
public class OtpService {

    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private final RedisTemplate<String, String> redisTemplate;

    public OtpService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateAndStoreOtp(Long id) {
        String otp = generateOtp("ABCDEFG123456789", 10);
        String cacheKey = "otp:" + id;
        redisTemplate.opsForValue().set(cacheKey, otp, Duration.ofMinutes(5));
        return otp;
    }

    public boolean isOtpValid(Long id, String otp) {
        String cacheKey = "otp:" + id.toString();
        return Objects.equals(redisTemplate.opsForValue().get(cacheKey), otp);
    }

    public void deleteOtp(Long id) {
        String cacheKey = "otp:" + id.toString();
        redisTemplate.delete(cacheKey);
    }

    private String generateOtp(String characters, int length) {
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = SECURE_RANDOM.nextInt(characters.length());
            otp.append(characters.charAt(index));
        }
        return otp.toString();
    }
}