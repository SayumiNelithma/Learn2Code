package com.skillshare.backend.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillshare.backend.entity.Follow;
import com.skillshare.backend.entity.FollowStatus;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.UserRepository;
import com.skillshare.backend.service.FollowService;

@RestController
@RequestMapping("/api/follow")

public class FollowController {

    @Autowired
    private FollowService followService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{userId}")
    public Follow sendFollowRequest(@PathVariable Long userId, Principal principal) {
        User follower = userRepository.findByEmail(principal.getName()).orElseThrow();
        User following = userRepository.findById(userId).orElseThrow();
        return followService.requestFollow(follower, following);
    }

    @PostMapping("/accept/{followId}")
    public Follow acceptFollowRequest(@PathVariable Long followId) {
        return followService.acceptFollow(followId);
    }

    @GetMapping("/requests")
    public List<Follow> getPendingRequests(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return followService.getPendingRequests(user);
    }

    
}