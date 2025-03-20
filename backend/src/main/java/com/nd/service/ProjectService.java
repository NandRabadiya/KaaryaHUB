package com.nd.service;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.Chat;
import com.nd.model.Project;
import com.nd.model.User;

import java.util.List;


public interface ProjectService {
    Project createProject(Project project, Long userId) throws UserException , ProjectException;

//	List<Project> getProjectsByOwner(User owner) throws ProjectException;

    List<Project> getProjectsByTeam(User user, String category, String tag) throws ProjectException;


    Project getProjectById(Long projectId) throws ProjectException;

    String deleteProject(Long projectId,Long userId) throws UserException;

    Project updateProject(Project updatedProject, Long id) throws ProjectException;

    List<Project> searchProjects(String keyword, User user) throws ProjectException;

    void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException;

    void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException;

    Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException;



}

