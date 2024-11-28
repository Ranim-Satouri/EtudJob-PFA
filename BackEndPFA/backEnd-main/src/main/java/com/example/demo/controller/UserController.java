package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserIService;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserController {
	
	@Autowired
	private UserIService uService;
	
	@GetMapping("/getusers")
	public List<User> GetUsers() {
		return uService.getUsers();
	}
	@GetMapping("numbreUsers")
	public int getNumberUsers()
	{
		return uService.getNumberUsers();
		}
	@PutMapping("updateUser/{idUser}")
	public User updateUser(@PathVariable Long idUser,@RequestBody User updatedUser){
		
		return uService.updateUser(idUser,updatedUser);
	}
	@GetMapping("/Userbymail/{mail}")
	public Optional<User> getUserBymail(@PathVariable String mail) {
		return uService.getUserBymail(mail);
	}
	
	@PostMapping("/inscri-user")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		return uService.addUser(user);
	}

	@PutMapping("/modifierMotdePasse/{idUser}/{pwd}")
	public User mofidierPwd(@PathVariable Long idUser ,@PathVariable String pwd){
		return uService.modifierPwd(idUser,pwd);
	}

	@GetMapping("/verifierPwd/{idUser}/{pwd}")
	public boolean verifierPwd(@PathVariable Long idUser ,@PathVariable String pwd){
		return uService.verifierPwd(idUser,pwd);
	}

	@DeleteMapping("/deleteUser/{idUser}")
    public void deleteUser( @PathVariable("idUser") Long idUser) {
        uService.deleteUser(idUser);
    }
	@GetMapping("/getuserbyrole")
	public List<User> getUsersByRole(String role) 
	{
		return uService.getUsersByRole("employer");
	}
	@GetMapping("getNumberOfEtudiants")
	public int getNumberOfEtudiants()
	{
		return uService.getNumberOfEtudiants();
	}
	@GetMapping("getNumberOfEmployeur")
	public int getNumberOfEmployeur() 
	{
		return uService.getNumberOfEmployeur();
	}
	
}
