package com.onlinecourse.onlinecourcebooking.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	private String coursename;
	private String courseduration;
	private String courseauthor;
	private double cost;
	public Course(int id, String coursename, String courseduration, String courseauthor, double cost) {
		super();
		this.id = id;
		this.coursename = coursename;
		this.courseduration = courseduration;
		this.courseauthor = courseauthor;
		this.cost = cost;
	}
	public Course() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCoursename() {
		return coursename;
	}
	public void setCoursename(String coursename) {
		this.coursename = coursename;
	}
	public String getCourseduration() {
		return courseduration;
	}
	public void setCourseduration(String courseduration) {
		this.courseduration = courseduration;
	}
	public String getCourseauthor() {
		return courseauthor;
	}
	public void setCourseauthor(String courseauthor) {
		this.courseauthor = courseauthor;
	}
	public double getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}
	
}
