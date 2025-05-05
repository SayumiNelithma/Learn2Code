package com.skillshare.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillshare.backend.entity.Follow;
import com.skillshare.backend.entity.FollowStatus;
import com.skillshare.backend.entity.User;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByFollower(User user);
    boolean existsByFollowerAndFollowing(User follower, User following);
    List<Follow> findByFollowingAndStatus(User user, FollowStatus status);
    List<Follow> findByFollowerAndStatus(User user, FollowStatus status);
    Optional<Follow> findByFollowerAndFollowing(User follower, User following);
}