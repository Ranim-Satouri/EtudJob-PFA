package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.EmailService;

@RestController
public class EmailController {

 @Autowired
 private EmailService emailService;

@GetMapping("/sendEmail")
 public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String text) {
    emailService.sendSimpleMessage(to, subject, text);
 return "Email sent successfully"; 

}}