package com.nd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nd.exception.MailsException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmailWithToken(String userEmail, String link) throws MailsException {

      System.out.println("Sending mail with token");
        SimpleMailMessage message = new SimpleMailMessage();

        String subject = "Join Project Team Invitation";
        String text = "Click the link to join the project team: " + link;

        message.setSubject(subject);
        message.setText(text);
        message.setTo(userEmail);
        message.setFrom("collegedealzz@gmail.com");

        try {
            javaMailSender.send(message);
            System.out.println("Mail sent");
        } catch (MailException e) {
            throw new MailsException("Failed to send email");
        }
    }
}

