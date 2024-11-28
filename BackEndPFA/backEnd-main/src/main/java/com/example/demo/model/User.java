package com.example.demo.model;
import java.sql.Timestamp;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private Long idUser;
	@Column
	private String firstName;
	@Column
	private String lastName;
	@Column
	private Date dateNaissance;
	
	@Column
	private String mail;
	
	@Column
	private int tel;
	
	@Column
	private String genre;
	
	@Column
	private String pwd;
	
	@Column
	private Timestamp signInDate;
	
	@Column
	private String eduLevel;
	
	@Column
	private String etablissement;
	
	@Column 
	private String description;
	
	@Column
	private String role;
	
	// @Column
	// private String image;


	
}
