package com.skillshare.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.skillshare.backend.entity.Post;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.PostRepository;
import com.skillshare.backend.repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NotificationService notificationService;



    public Post save(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByUser(User user) {
        return postRepository.findByUser(user);
    }

    public Post updatePostWithMedia(Long postId, String userEmail, String title, String description, List<String> newMediaPaths) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    
        if (!post.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not authorized to update this post");
        }
    
        post.setTitle(title);
        post.setDescription(description);
    
        if (!newMediaPaths.isEmpty()) {
            // Optional: delete old files if replacing
            for (String oldPath : post.getMediaPaths()) {
                try {
                    Path filePath = Paths.get("src/main/resources/static" + oldPath);
                    Files.deleteIfExists(filePath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            post.setMediaPaths(newMediaPaths);
        }
    
        return postRepository.save(post);
    }