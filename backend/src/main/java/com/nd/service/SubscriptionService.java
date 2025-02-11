package com.nd.service;

import com.nd.domain.PlanType;
import com.nd.model.Subscription;
import com.nd.model.User;

public interface SubscriptionService {
    Subscription createSubscription(User user);
    Subscription getUserSubscription(Long userId) throws Exception;
    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
