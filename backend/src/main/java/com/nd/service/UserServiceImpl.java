package com.nd.service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import com.nd.exception.ProjectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nd.config.JwtProvider;
import com.nd.exception.UserException;
import com.nd.model.User;
import com.nd.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

//	@Autowired
//	private ProjectService projectService;

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException, ProjectException {
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);

//		int projectSize=projectService.getProjectsByTeam(user,null,null).size();
//		user.setProjectSize(projectSize);

        userRepository.save(user);

        if (user == null) {
            throw new UserException("user not exist with email " + email);
        }
        return user;
    }

    @Override
    public User findUserByEmail(String username) throws UserException {

        User user = userRepository.findByEmail(username);

        if (user != null) {

            return user;
        }

        throw new UserException("user not exist with username " + username);
    }

    @Override
    public User findUserById(Long userId) throws UserException {
        Optional<User> opt = userRepository.findById(userId);

        if (opt.isEmpty()) {
            throw new UserException("user not found with id " + userId);
        }
        return opt.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()+number);
        if(user.getProjectSize()==-1){
            return user;
        }
        return userRepository.save(user);
    }

    @Override
    public void updatePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    private String generateRandomToken() {
        return UUID.randomUUID().toString();
    }

    private Date calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 10);
        return cal.getTime();
    }

}

