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