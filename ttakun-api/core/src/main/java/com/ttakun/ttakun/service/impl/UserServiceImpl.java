package com.ttakun.ttakun.service.impl;

import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.exception.RecoverPasswordNotFoundException;
import com.ttakun.ttakun.exception.UserNotFoundException;
import com.ttakun.ttakun.repository.RecoverPasswordRepository;
import com.ttakun.ttakun.repository.UserRepository;
import com.ttakun.ttakun.service.UserService;
import com.ttakun.ttakun.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RecoverPasswordRepository recoverPasswordRepository;
    private EmailServiceImpl emailService;

    @Autowired
    public UserServiceImpl(
        UserRepository userRepository,
        RecoverPasswordRepository recoverPasswordRepository,
        EmailServiceImpl emailService
    ) {
        this.userRepository = userRepository;
        this.recoverPasswordRepository = recoverPasswordRepository;
        this.emailService = emailService;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmailAndDeletedFalse(email);
    }

    public User getUserByEmailOrException(String email) {
        User user = getUserByEmail(email);
        if (user == null) {
            throw new UserNotFoundException();
        }

        return user;
    }

    public User getUserByHash(String hash) {
        return userRepository.findByHashAndDeletedFalse(hash);
    }

    public User getUserOrException(String hash) {
        User user = getUserByHash(hash);
        if (user == null) {
            throw new UserNotFoundException();
        }

        return user;
    }

    public void createRecoverPassword(User user) {
        RecoverPassword recoverPassword = new RecoverPassword(user);

        recoverPasswordRepository.save(recoverPassword);

        emailService.sendRecoverPasswordEmail(recoverPassword);
    }

    public RecoverPassword getRecoverPassword(String hash) {
        return recoverPasswordRepository.findByHash(hash);
    }

    public RecoverPassword getRecoverPasswordOrException(String hash) {
        RecoverPassword recoverPassword = getRecoverPassword(hash);
        if (recoverPassword == null) {
            throw new RecoverPasswordNotFoundException();
        }

        return recoverPassword;
    }

    public RecoverPassword getValidRecoverPasswordByHash(String hash) {
        RecoverPassword recoverPassword = recoverPasswordRepository.findByHashAndUsed(hash, false);
        if (recoverPassword == null || recoverPassword.isExpired() ) {
            throw new RecoverPasswordNotFoundException();
        }

        return recoverPassword;
    }

    public void resetPassword(RecoverPassword recoverPassword, String password) {
        updatePassword(recoverPassword.getUser(), password);
        markRecoverPasswordAsUsed(recoverPassword);
    }

    private void updatePassword(User user, String password) {
        user.setPassword(PasswordUtil.encode(password));
        userRepository.save(user);
    }

    private void markRecoverPasswordAsUsed(RecoverPassword recoverPassword) {
        recoverPassword.setUsed(true);
        recoverPasswordRepository.save(recoverPassword);
    }
}
