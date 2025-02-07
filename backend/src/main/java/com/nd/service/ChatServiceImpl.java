package com.nd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.model.Chat;
import com.nd.model.User;
import com.nd.repository.ChatRepository;
import com.nd.repository.ProjectRepository;
import com.nd.repository.UserRepository;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;


    @Override
    public Chat createChat(Chat chat) {
        return chatRepository.save(chat);
    }
}

