package com.nd.modal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ManyToAny;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String category;

    @ElementCollection
    private List<String> tags = new ArrayList<String>();

    @JsonIgnore
    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true)
    private Chat chat;

    @ManyToOne
    private User owner;

    @JsonIgnore
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Issue> issues = new ArrayList<>();


    @ManyToMany
    private List<User> team = new ArrayList<>();


}

