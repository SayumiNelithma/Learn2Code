package com.skillshare.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillshare.backend.entity.Follow;
import com.skillshare.backend.entity.FollowStatus;
import com.skillshare.backend.entity.User;
import com.skillshare.backend.repository.FollowRepository;

@Service
public class FollowService {

    @Autowired
    private FOllowRepository followRepository;

    public Follow follow(User follower, User following) {
        if (!followRepository.existsByFollowerAndFollowing(follower, following)) {
            Follow follow = new Follow();
            follow.setFollower(follower);
            follow.setFollowing(following);
            return followRepository.save(follow);
        }
        return null; // already following
    }

    public List<Follow> getFollowing(User follower) {
        return followRepository.findByFollower(follower);
    }

}
