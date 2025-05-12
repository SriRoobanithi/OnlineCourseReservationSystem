package com.onlinecourse.onlinecourcebooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onlinecourse.onlinecourcebooking.entity.Course;
import com.onlinecourse.onlinecourcebooking.entity.User;
import com.onlinecourse.onlinecourcebooking.service.CourseService;

@RestController
@CrossOrigin
@RequestMapping("api")
public class Controller {

	@Autowired
	private CourseService curservice;
	
	@GetMapping("getall")
	public List<Course> getAllCourse(){
		return curservice.getAllCourse();
	}
	@GetMapping("/course/{coursename}")
	public Course getByTitle(@PathVariable String coursename) {
		return curservice.getbytitle(coursename);
	}
	@GetMapping("/courses/{id}")
	public Course findbyid(@PathVariable int id) {
		return curservice.findById(id);
	}
	@GetMapping("findUser/{id}")
	public User FindUserByid(@PathVariable int id) {
		return curservice.findUserById(id);
	}
	@GetMapping("getuser/{email}")
	@CrossOrigin(origins = "http://127.0.0.1:5500")
	public User findUserByEmail(@PathVariable String email) {
		return curservice.finduserbyemail(email);
	}
	
	@PutMapping("adduser/{uid}&{cid}")
	public User addcourseToUser(@PathVariable int uid,@PathVariable int cid) {
		return curservice.addcourseToUser(uid, cid);
	}
	
	@PostMapping("savecourse")
	public Course saveCourse(@RequestBody Course course) {
		return curservice.saveCourse(course);
	}
	@PostMapping("addUser")
	public User saveUser(@RequestBody User user) {
		return curservice.saveUser(user);
	}
}
