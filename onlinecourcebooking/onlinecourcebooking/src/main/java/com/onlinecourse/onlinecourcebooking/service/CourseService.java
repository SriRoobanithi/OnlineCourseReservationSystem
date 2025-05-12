package com.onlinecourse.onlinecourcebooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlinecourse.onlinecourcebooking.dao.Dao;
import com.onlinecourse.onlinecourcebooking.entity.Course;
import com.onlinecourse.onlinecourcebooking.entity.User;

@Service
public class CourseService {

	@Autowired
	private Dao dao;
	
	public User saveUser(User user) {
		return dao.saveUser(user);
	}
	
    public User findUserById(int id) {
    	return dao.findUserById(id);
    }
	
    public User addcourseToUser(int uid,int cid) {
    	return dao.addcourseToUser(uid, cid);
    }
    
    public User finduserbyemail(String email) {
    	return dao.findUserByEmail(email);
    }
    
	public List<Course> getAllCourse(){
		return dao.getAllCourse();
	}
	public Course findById(int id) {
		return dao.fingbyId(id);
	}
	public Course getbytitle(String coursename) {
		return dao.getbytitle(coursename);
	}
	
	public Course saveCourse(Course coerse)
	{
		return dao.saveCourse(coerse);
	}
}
