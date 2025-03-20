package com.nd.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.nd.domain.PlanType;
import com.nd.model.Subscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.Chat;
import com.nd.model.Project;
import com.nd.model.User;
import com.nd.repository.ProjectRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;


    @Override
    public Project createProject(Project project, Long id) throws UserException, ProjectException {
        User user = userService.findUserById(id);

        // Get the user's subscription
        Subscription subscription = user.getSubscription();

        if (subscription != null && subscription.getPlanType() == PlanType.FREE) {
            if (user.getProjectSize() >= 3) {
                throw new ProjectException("Upgrade your plan to add more projects.");
            }
        }

        // Create new project
        Project createdProject = new Project();
        createdProject.setOwner(user);
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject = projectRepository.save(createdProject);
        savedProject.getTeam().add(user);

        // Create and associate a chat for the project
        Chat chat = new Chat();
        chat.setProject(savedProject);
        Chat projectChat = chatService.createChat(chat);
        savedProject.setChat(projectChat);

        // Increase user's project count
        userService.updateUsersProjectSize(user, 1);

        return savedProject;
    }


    @Override
    public List<Project> getProjectsByTeam(User user,String category,String tag) throws ProjectException {
        List<Project> projects= projectRepository.findByTeamContainingOrOwner(user,user);

        if (category != null) {
            projects = projects.stream()
                    .filter(project -> project.getCategory().equals(category))
                    .collect(Collectors.toList());
        }

        if (tag != null) {
            projects = projects.stream()
                    .filter(project -> project.getTags().contains(tag))
                    .collect(Collectors.toList());
        }

        return projects;
    }



    @Override
    public Project getProjectById(Long projectId) throws ProjectException {
        Optional<Project> project = projectRepository.findById(projectId);
        if(project.isPresent()) {
            return project.get();
        }
        throw new ProjectException("No project exists with the id "+projectId);
    }

    @Override
    public String deleteProject(Long projectId,Long id) throws UserException {
        User user = userService.findUserById(id);
        System.out.println("user ____>"+user);
        if(user!=null) {
            projectRepository.deleteById(projectId);
            return "project deleted";
        }
        throw new UserException("User doesnot exists");
    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws ProjectException {
        Project project = getProjectById(id);

        if (project != null) {
            // Update the existing project with the fields from updatedProject
            if (updatedProject.getName() != null) {
                project.setName(updatedProject.getName());
            }

            if (updatedProject.getDescription() != null) {
                project.setDescription(updatedProject.getDescription());
            }

            if (updatedProject.getTags() != null) {
                project.setTags(updatedProject.getTags());
            }

            // Save the updated project once
            return projectRepository.save(project);
        }

        throw new ProjectException("Project does not exist");
    }

    @Override
    public List<Project> searchProjects(String keyword, User user) throws ProjectException {
        String partialName = "%" + keyword + "%";
        List<Project> list = projectRepository.findByNameContainingAndTeamContains(keyword,user);
        if(list!=null) {
            return list;
        }
        throw new ProjectException("No Projects available");
    }

    @Override
    @Transactional
    public void addUserToProject(Long projectId, Long userId) throws UserException, ProjectException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new ProjectException("project not found"));
        User user = userService.findUserById(userId);

        if (!project.getTeam().contains(user)) {
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
            projectRepository.save(project);
        }


    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws UserException, ProjectException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectException("project not found"));
        User user = userService.findUserById(userId);

        if (project.getTeam().contains(user)) {
            project.getTeam().remove(user);
            project.getChat().getUsers().remove(user);
        }

    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws ProjectException, ChatException {
        Project project = projectRepository.findById(projectId).orElseThrow(()-> new ProjectException("Project not found"));
        if( project != null ) return project.getChat() ;


        throw new ChatException("no chats found");

    }

    public List<User> getUsersByProjectId(Long projectId) throws ProjectException {
        Project project = projectRepository.findById(projectId).orElse(null);
        if( project != null) return project.getChat().getUsers();

        throw new ProjectException("no project found with id "+projectId);
    }



}
