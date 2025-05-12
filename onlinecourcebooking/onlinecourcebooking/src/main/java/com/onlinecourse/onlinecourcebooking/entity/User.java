package com.onlinecourse.onlinecourcebooking.entity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
   private int id;
   private String name;
   private int age;
   private long contactno;
   private String email;
   private int password;
   @OneToMany
   @Autowired
   private List<Course> course;
   
public User(int id, String name, int age, long contactno, String email, int password, List<Course> course) {
	super();
	this.id = id;
	this.name = name;
	this.age = age;
	this.contactno = contactno;
	this.email = email;
	this.password = password;
	this.course = course;
}

public int getId() {
	return id;
}

public void setId(int id) {
	this.id = id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

public int getAge() {
	return age;
}

public void setAge(int age) {
	this.age = age;
}

public long getContactno() {
	return contactno;
}

public void setContactno(long contactno) {
	this.contactno = contactno;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public int getPassword() {
	return password;
}

public void setPassword(int password) {
	this.password = password;
}

public List<Course> getCourse() {
	return course;
}

public void setCourse(List<Course> course) {
	this.course = course;
}

public User() {
	super();
}
   
}
