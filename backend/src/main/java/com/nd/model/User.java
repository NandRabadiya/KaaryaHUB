package com.nd.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nd.domain.PlanType;
import com.nd.domain.SubscriptionType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Id
    @SequenceGenerator(
            name = "user_seq",
            sequenceName = "user_seq",
            allocationSize = 1,
            initialValue = 1001
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    private Long id;


    private String fullName;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "assignee", cascade = CascadeType.ALL)
    private List<Issue> assignedIssues = new ArrayList<>();


    @ToString.Exclude
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    @EqualsAndHashCode.Exclude
	private Subscription subscription;

    private int projectSize=0;

    @JsonIgnore
    @ManyToMany(mappedBy = "team")
    @ToString.Exclude
    private List<Project> projects = new ArrayList<>();


    @PrePersist
    public void prePersist() {
        if (this.subscription == null) {
            Subscription sub = new Subscription();
            sub.setSubscriptionStartDate(LocalDate.now());
            // Set an end date as needed, here for example 1 month from now.
            sub.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
            sub.setSubscriptiontype(SubscriptionType.FREE);
            sub.setPlanType(PlanType.FREE);
            sub.setValid(true);
            // Set the bi-directional relationship
            sub.setUser(this);
            this.subscription = sub;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Issue> getAssignedIssues() {
        return assignedIssues;
    }

    public void setAssignedIssues(List<Issue> assignedIssues) {
        this.assignedIssues = assignedIssues;
    }

    public int getProjectSize() {
        return projectSize;
    }

    public void setProjectSize(int projectSize) {
        this.projectSize = projectSize;

    }


}
