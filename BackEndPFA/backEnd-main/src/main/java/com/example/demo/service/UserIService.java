package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.demo.model.User;


public interface UserIService {
	public List<User> getUsers();
	public ResponseEntity<User> addUser(User user);
	public Optional<User> getUserBymail(String mail);
	public User updateUser(Long idUSer,User updatedUser);
	public User modifierPwd(Long idUser ,String pwd);
	public boolean verifierPwd(Long idUser ,String pwd);
	public void deleteUser(Long idUser);
	public int getNumberUsers();
	public int getNumberOfEtudiants();
	public int getNumberOfEmployeur();
	public List<User> getUsersByRole(String role);
}
