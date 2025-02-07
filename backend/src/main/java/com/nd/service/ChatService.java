package com.nd.service;


import java.util.List;

import com.nd.exception.ChatException;
import com.nd.exception.ProjectException;
import com.nd.model.Chat;

public interface ChatService {

    Chat createChat(Chat chat) ;

}
