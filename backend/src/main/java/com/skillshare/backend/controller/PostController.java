package com.skillshare.backend.controller;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.skillshare.backend.config.JwtUtil;
import com.skillshare.backend.entity.Follow;
import com.skillshare.backend.entity.Post;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.PostRepository;
import com.skillshare.backend.repository.UserRepository;
import com.skillshare.backend.service.FollowService;
import com.skillshare.backend.service.PostService;
// import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private FollowService followService;

    @Autowired
    private PostRepository postRepository;


    @PostMapping
    @SuppressWarnings("CallToPrintStackTrace")
    public ResponseEntity<Post> createPost(@RequestPart("title") String title,
                                           @RequestPart("description") String description,
                                           @RequestPart("files") MultipartFile[] files,
                                           Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        List<String> filePaths = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String filename = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
                Path path = Paths.get(uploadDir, filename);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                filePaths.add("/uploads/" + filename);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        Post post = new Post();
        post.setTitle(title);
        post.setDescription(description);
        post.setMediaPaths(filePaths);
        post.setUser(user);

        return ResponseEntity.ok(postService.save(post));
    }
