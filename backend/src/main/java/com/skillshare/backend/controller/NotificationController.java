package com.skillshare.backend.controller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillshare.backend.config.JwtUtil;
import com.skillshare.backend.entity.Notification;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.UserRepository;
import com.skillshare.backend.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")       //Notification base path
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        User user = userRepository.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(notificationService.getNotificationsForUser(user));
    }
    @PutMapping("/mark-read")
    public ResponseEntity<?> markAsRead(@RequestHeader("Authorization") String authHeader) {
        String email = jwtUtil.extractEmail(authHeader.substring(7));
        User user = userRepository.findByEmail(email).orElseThrow();
        notificationService.markAllAsRead(user);
        return ResponseEntity.ok().body("Marked as read");
    }
}
