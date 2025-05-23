package com.nd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nd.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId);
}
