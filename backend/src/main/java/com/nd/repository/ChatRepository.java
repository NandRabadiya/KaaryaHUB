package com.nd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nd.model.Chat;
import com.nd.model.Project;

public interface ChatRepository extends JpaRepository<Chat, Long> {


    Chat findByProject(Project projectById);

}

