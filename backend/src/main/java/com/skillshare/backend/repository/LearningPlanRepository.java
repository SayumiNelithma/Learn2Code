package com.skillshare.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillshare.backend.entity.LearningPlan;
import com.skillshare.backend.entity.User;

public interface LearningPlanRepository extends JpaRepository<LearningPlan, Long> {
    List<LearningPlan> findByUser(User user);
}
