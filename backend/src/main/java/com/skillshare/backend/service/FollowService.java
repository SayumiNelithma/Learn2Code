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

    public Follow requestFollow(User follower, User following) {
        if (!followRepository.existsByFollowerAndFollowing(follower, following)) {
            Follow follow = new Follow();
            follow.setFollower(follower);
            follow.setFollowing(following);
            follow.setStatus(FollowStatus.PENDING);
            return followRepository.save(follow);
        }
        return null;
    }

    public Follow acceptFollow(Long followId) {
        Follow follow = followRepository.findById(followId).orElseThrow();
        follow.setStatus(FollowStatus.ACCEPTED);
        return followRepository.save(follow);
    }

}
