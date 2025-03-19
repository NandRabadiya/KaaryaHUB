package com.nd.Dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private List<String> tags;
    private UserDTO owner;
    private List<UserDTO> team;
    private List<IssueDTO> issues;
    private Long chatId;
    private String status; // Example: "In Progress"
}
