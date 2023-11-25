package com.ttakun.ttakun.useCase.user.recoverPassword;

import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class RecoverPasswordUseCase {

    private UserService userService;

    @Autowired
    public RecoverPasswordUseCase(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    public void execute(RecoverPasswordInput input) {
        User user = userService.getUserByEmailOrException(input.getEmail());

        userService.createRecoverPassword(user);
    }
}
