package com.smartcalender.app.repository;

import com.smartcalender.app.entity.Otp;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Otp o WHERE o.expiration < :now")
    void deleteByExpirationBefore(LocalDateTime now);
}
