package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImp implements EmailService{

 @Autowired/*private JavaMailSender mailSender;
@Override
public void sendSimpleMessage(String to, String subject, String text) { try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("aniiimind22@gmail.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

 mailSender.send(message);
 } catch (MailException exception) {
 exception.printStackTrace();
 }
 }*/
 private JavaMailSender emailSender;
 public void sendSimpleMessage(String to, String subject, String text) {
        try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("etujob.fst@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
            emailSender.send(message);
            }catch (MailException exception) {
            exception.printStackTrace();}} 
        }