package com.nd.controller;

import java.util.List;

import com.nd.Dto.IssueDTO;
import com.nd.Dto.ProjectDTO;
import com.nd.Dto.UserDTO;
import com.nd.exception.MailsException;
import com.nd.model.Invitation;
import com.nd.request.ProjectInvitationRequest;
import com.nd.response.MessageResponse;
import com.nd.service.InvitationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.Chat;
import com.nd.model.Project;
import com.nd.model.User;
import com.nd.service.ProjectService;
import com.nd.service.UserService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;


    @Autowired
    private InvitationService invitationService;


    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag,
            @RequestHeader("Authorization") String token) throws ProjectException, UserException {
        User user = userService.findUserProfileByJwt(token);
        List<Project> projects = projectService.getProjectsByTeam(user,category,tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long projectId) throws ProjectException {
        Project project = projectService.getProjectById(projectId);

        ProjectDTO projectDTO = new ProjectDTO(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getCategory(),
                project.getTags(),
                new UserDTO(project.getOwner().getId(), project.getOwner().getFullName()),
                project.getTeam().stream().map(user -> new UserDTO(user.getId(), user.getFullName())).toList(),
                project.getIssues().stream().map(issue -> new IssueDTO(issue.getId(), issue.getTitle(), issue.getStatus())).toList(),
                project.getChat() != null ? project.getChat().getId() : null,
                "In Progress"
        );

        return ResponseEntity.ok(projectDTO);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project project,
            @RequestHeader("Authorization") String token) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(token);
      //  project.setOwner(user);
        Project createdProject = projectService.createProject(project, user.getId());
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject( @RequestBody Project updatedProject,@PathVariable Long projectId, @RequestHeader("Authorization") String token) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(token);
        Project updated = projectService.updateProject(updatedProject,projectId);
        return updated != null ?
                new ResponseEntity<>(updated, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long projectId, @RequestHeader("Authorization") String token) throws UserException, ProjectException {
        User user = userService.findUserProfileByJwt(token);

        MessageResponse response =new MessageResponse(projectService.deleteProject(projectId, user.getId()));
        userService.updateUsersProjectSize(user,-1);
        return ResponseEntity.ok(response);
    }





    @GetMapping("/search")
    public ResponseEntity< List<Project>> searchProjects(
            @RequestParam(required = false) String keyword,
            @RequestHeader("Authorization") String jwt
    ) throws ProjectException, UserException {
        User user=userService.findUserProfileByJwt(jwt);
        List<Project> projects = projectService.searchProjects(keyword,user);
        return ResponseEntity.ok(projects);
    }

    @PostMapping("/{userId}/add-to-project/{projectId}")
    public ResponseEntity<MessageResponse> addUserToProject(
            @PathVariable Long userId,
            @PathVariable Long projectId) throws UserException, ProjectException {
        projectService.addUserToProject(projectId, userId);
        MessageResponse response =new MessageResponse("User added to the project successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(@PathVariable Long projectId)
            throws ProjectException, ChatException {
        Chat chat = projectService.getChatByProjectId(projectId);
        return chat != null ? ResponseEntity.ok(chat) : ResponseEntity.notFound().build();
    }


    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteToProject(
            @RequestBody ProjectInvitationRequest req) throws MailsException, MessagingException {

        invitationService.sendInvitation(req.getEmail(), req.getProjectId());

        MessageResponse res=new MessageResponse();
        res.setMessage("User invited to the project successfully");
        return ResponseEntity.ok(res);

    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInvitation(@RequestParam String token,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserProfileByJwt(jwt);

        Invitation invitation = invitationService.acceptInvitation(token,user.getId());
        projectService.addUserToProject(invitation.getProjectId(),user.getId());

        return new ResponseEntity<>(invitation,HttpStatus.ACCEPTED);
    }


}





