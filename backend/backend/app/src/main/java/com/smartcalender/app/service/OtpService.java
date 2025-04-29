package com.smartcalender.app.service;

import com.smartcalender.app.entity.Otp;
import com.smartcalender.app.repository.OtpRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private static final int OTP_EXPIRATION_MINUTES = 30;

    public OtpService(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    public String generateAndStoreOtp(Long userId) {
        String otp = generateOtp();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(OTP_EXPIRATION_MINUTES);
        Otp otpEntity = new Otp();
        otpEntity.setUserId(userId);
        otpEntity.setOtp(otp);
        otpEntity.setExpiration(expiration);
        otpRepository.save(otpEntity);
        return otp;
    }

    public boolean isOtpValid(Long userId, String otp) {
        Otp otpEntity = otpRepository.findById(userId).orElse(null);

        if (otpEntity == null || otpEntity.getExpiration().isBefore(LocalDateTime.now())) {
            return false;
        }
        return otpEntity.getOtp().equals(otp);
    }

    @Transactional
    public void deleteOtp(Long userId) {
        if (otpRepository.existsById(userId)) {
            otpRepository.deleteById(userId);
        }
    }

    private String generateOtp() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }

    @Scheduled(fixedRate = 3600000)  //Every hour
    public void deleteExpiredOtps() {
        LocalDateTime now = LocalDateTime.now();
        otpRepository.deleteByExpirationBefore(now);
    }

}