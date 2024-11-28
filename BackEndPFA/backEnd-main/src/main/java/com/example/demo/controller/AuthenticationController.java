package com.example.demo.controller;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.BcryptGenerator;
import com.example.demo.service.UserIService;
import DTO.LoginDto;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthenticationController {
    @Autowired
    private UserIService userService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        
        BcryptGenerator bcryptGenerator = new BcryptGenerator();
        //String hashedPassword = bcryptGenerator.passwordEncoder(loginDto.getPwd());
        //System.out.println("cryptage login"+hashedPassword);
        
        Optional<User> userOptional = userService.getUserBymail(loginDto.getMail());
        System.out.println(loginDto.getPwd());
        if(userOptional.isPresent() && bcryptGenerator.passwordDecoder(loginDto.getPwd(), userOptional.get().getPwd())  ) {
            User user = userOptional.get();
            return ResponseEntity.ok().body(user);
        }else{
            // Erreur er=new Erreur();
            // er.setMessage("aandna mochkla lenna ");
            // return ResponseEntity.ok().body(er);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}