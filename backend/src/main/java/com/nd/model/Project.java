package com.nd.model;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @Id
    @SequenceGenerator(
            name = "project_seq",
            sequenceName = "project_seq",
            allocationSize = 1,
            initialValue = 1001
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "project_seq")
    private Long id;

    private String name;

    private String description;

    private String category;


    private List<String> tags = new ArrayList<String>();

    @JsonIgnore
    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    private Chat chat;

    @ManyToOne
    @JsonIgnore
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Issue> issues = new ArrayList<>();


    @ManyToMany
    @ToString.Exclude
    private List<User> team = new ArrayList<>();

//    @ManyToMany
//    @JoinTable(
//            name = "project_team",
//            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id")
//    )
//    private List<User> team = new ArrayList<>();


}

