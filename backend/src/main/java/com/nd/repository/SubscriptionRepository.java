package com.nd.repository;

import com.nd.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription,Long> {
    Subscription findByUserId(Long userId);
}
