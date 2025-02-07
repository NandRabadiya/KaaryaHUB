package com.nd.service;


import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.User;

public interface UserService {

    public User findUserProfileByJwt(String jwt) throws UserException, ProjectException;

    public User findUserByEmail(String email) throws UserException;

    public User findUserById(Long userId) throws UserException;

    public User updateUsersProjectSize(User user,int number);



    void updatePassword(User user, String newPassword);


}
