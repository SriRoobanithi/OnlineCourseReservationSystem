package com.onlinecourse.onlinecourcebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.onlinecourse.onlinecourcebooking.entity.Course;

@Component
public interface CourseRepo extends JpaRepository<Course, Integer> {

}
