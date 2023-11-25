package com.ttakun.ttakun.repository;

import com.ttakun.ttakun.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmailAndDeletedFalse(String email);

    User findByHashAndDeletedFalse(String hash);
}
