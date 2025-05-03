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
