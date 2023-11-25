package com.ttakun.ttakun.loader;

import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.repository.UserRepository;
import com.ttakun.ttakun.util.PasswordUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserLoader implements Loader {
    private static final Logger logger = LoggerFactory.getLogger(UserLoader.class);

    private UserRepository userRepository;

    @Autowired
    public UserLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void delete() {
        userRepository.deleteAll();
        logger.info("Deleted all users.");
    }

    @Override
    public void insert() {
        List<User> users = Arrays.asList(
            new User("admin", "Ttakun", "admin@ttakun.com", PasswordUtil.encode("admin"), "Europe/Madrid", false),
            new User("User1", "Ttakun", "user1@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User2", "Ttakun", "user2@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User3", "Ttakun", "user3@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User4", "Ttakun", "user4@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User5", "Ttakun", "user5@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User6", "Ttakun", "user6@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User7", "Ttakun", "user7@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User8", "Ttakun", "user8@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User9", "Ttakun", "user9@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User10", "Ttakun", "user10@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User11", "Ttakun", "user11@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User12", "Ttakun", "user12@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User13", "Ttakun", "user13@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User14", "Ttakun", "user14@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User15", "Ttakun", "user15@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User16", "Ttakun", "user16@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User17", "Ttakun", "user17@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User18", "Ttakun", "user18@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User19", "Ttakun", "user19@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User20", "Ttakun", "user20@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User21", "Ttakun", "user21@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User22", "Ttakun", "user22@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User23", "Ttakun", "user23@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User24", "Ttakun", "user24@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false),
            new User("User25", "Ttakun", "user25@ttakun.com", PasswordUtil.encode("ttakun"), "Europe/Madrid", false)
        );

        userRepository.saveAll(users);
        logger.info(String.format("Saved %d users.", users.size()));
    }
}
