package com.skillshare.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillshare.backend.entity.Status;
import com.skillshare.backend.entity.User;

public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findByUser(User user);
    List<Status> findByExpiresAtAfter(LocalDateTime now);
}