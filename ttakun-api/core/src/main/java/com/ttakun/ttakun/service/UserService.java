package com.ttakun.ttakun.service;

import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.entity.User;

public interface UserService {

    User getUserByEmail(String email);

    User getUserByEmailOrException(String email);

    User getUserByHash(String hash);

    User getUserOrException(String hash);

    void createRecoverPassword(User user);

    RecoverPassword getRecoverPassword(String hash);

    RecoverPassword getRecoverPasswordOrException(String hash);

    RecoverPassword getValidRecoverPasswordByHash(String hash);

    void resetPassword(RecoverPassword recoverPassword, String password);

}
