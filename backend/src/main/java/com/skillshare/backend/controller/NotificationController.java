package com.skillshare.backend.controller; 

// Importing Java utility classes
import java.util.List;  
// Used for handling lists, such as returning a list of notifications.

// Spring framework annotations and utilities
import org.springframework.beans.factory.annotation.Autowired;  

// Enables automatic dependency injection for required beans.
import org.springframework.http.ResponseEntity;  

// Used to represent the whole HTTP response, including status, headers, and body.
import org.springframework.web.bind.annotation.GetMapping;  

// Maps HTTP GET requests onto specific handler methods.
import org.springframework.web.bind.annotation.PutMapping;  

// Maps HTTP PUT requests onto specific handler methods.
import org.springframework.web.bind.annotation.RequestHeader;  

// Binds method parameters to HTTP request headers.
import org.springframework.web.bind.annotation.RequestMapping; 

// Maps web requests to Spring controller classes or methods.
import org.springframework.web.bind.annotation.RestController;  

// Marks this class as a RESTful web service controller in Spring.

// Application-specific imports
import com.skillshare.backend.config.JwtUtil;  

// Utility class for handling JWT token operations like parsing and validation.
import com.skillshare.backend.entity.Notification;  

// Represents the Notification entity, typically mapped to a database table.
import com.skillshare.backend.entity.User;  

// Represents the User entity, containing user-related data.
import com.skillshare.backend.repository.UserRepository;  

// Interface for accessing User data from the database.
import com.skillshare.backend.service.NotificationService;  
// Service class for business logic related to notifications.


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
