package com.nd.service;

import java.util.List;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.exception.UserException;
import com.nd.model.Message;

public interface MessageService {

    Message sendMessage(Long senderId, Long chatId, String content) throws UserException, ChatException, ProjectException;

    List<Message> getMessagesByProjectId(Long projectId) throws ProjectException, ChatException;


}

