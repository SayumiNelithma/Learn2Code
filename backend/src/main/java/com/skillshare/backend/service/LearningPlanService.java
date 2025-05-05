package com.skillshare.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillshare.backend.entity.LearningPlan;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.LearningPlanRepository;


@Service
public class LearningPlanService {

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    public LearningPlan save(LearningPlan plan) {
        return learningPlanRepository.save(plan);
    }

    public List<LearningPlan> getAllPlans() {
        return learningPlanRepository.findAll();
    }

    public List<LearningPlan> getPlansByUser(User user) {
        return learningPlanRepository.findByUser(user);
    }

    public void deleteById(Long id) {
        learningPlanRepository.deleteById(id);
    }
    public LearningPlan getPlanById(Long id) {
        return learningPlanRepository.findById(id).orElseThrow();
    }
    
    
}

