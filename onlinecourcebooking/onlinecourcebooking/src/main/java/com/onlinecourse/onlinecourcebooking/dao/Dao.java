package com.onlinecourse.onlinecourcebooking.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.onlinecourse.onlinecourcebooking.entity.Course;
import com.onlinecourse.onlinecourcebooking.entity.User;
import com.onlinecourse.onlinecourcebooking.repository.CourseRepo;
import com.onlinecourse.onlinecourcebooking.repository.UserRepo;

@Repository
public class Dao {

	@Autowired
	private UserRepo userrepo;
	@Autowired
	private CourseRepo courserep;
	
	public User saveUser(User user) {
		return userrepo.save(user);
	}
	
	public User findUserById(int id) {
		Optional<User> user=userrepo.findById(id);
		if(user.isPresent()) {
			User us=user.get();
			return us;
		}else {
			return null;
		}
	}
	
	public List<Course> getAllCourse(){
		return courserep.findAll();
	}
	
	public Course fingbyId(int id) {
		Optional<Course> course=courserep.findById(id);
		if(course.isPresent()) {
			Course cours=course.get();
			return cours;
		}
		else {
			return null;
		}
	}
	
	public Course getbytitle(String coursename) {
		List<Course> courses=getAllCourse();
		for(Course i:courses) {
			if(i.getCoursename().equals(coursename)) {
				Course cor=i;
				return cor;
			}
		}
		return null;
	}
	
	public Course saveCourse(Course course) {
		return courserep.save(course);
	}
	
	public User addcourseToUser(int uid,int cid) {
		User user=findUserById(uid);
		Course course=fingbyId(cid);
		if(user!=null) {
			if(course!=null) {
				user.getCourse().add(course);
				return user;
			}else {
				return null;
			}
			}else {
				return null;
		}
	}
	
	public User findUserByEmail(String email) {
		List<User> user=userrepo.findAll();
		for(User i:user) {
			if(i.getEmail().equals(email)) {
				return i;
			}
		}
		return null;
	}
	
}
