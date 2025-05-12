package com.onlinecourse.onlinecourcebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.onlinecourse.onlinecourcebooking.entity.User;

@Component
public interface UserRepo extends JpaRepository<User, Integer> {

}
