package com.nd.controller;

import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.User;
import com.nd.service.UserService;
import org.springframework.web.bind.annotation.RestController;


import com.nd.domain.PlanType;
import com.nd.model.Subscription;
import com.nd.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;

 

    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        Subscription userSubscription = subscriptionService.getUserSubscription(user.getId());

        if (userSubscription != null) {
            return new ResponseEntity<>(userSubscription, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradeSubscription(@RequestHeader("Authorization") String jwt,
                                                            @RequestParam PlanType planType) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(jwt);
        Subscription upgradedSubscription = subscriptionService.upgradeSubscription(user.getId(), planType);

        return new ResponseEntity<>(upgradedSubscription, HttpStatus.OK);

    }
}


