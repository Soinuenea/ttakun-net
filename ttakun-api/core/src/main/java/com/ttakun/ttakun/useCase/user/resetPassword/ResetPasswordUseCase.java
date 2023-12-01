package com.ttakun.ttakun.useCase.user.resetPassword;

import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.exception.PasswordMismatchException;
import com.ttakun.ttakun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class ResetPasswordUseCase {

    private UserService userService;

    @Autowired
    public ResetPasswordUseCase(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    public void execute(ResetPasswordInput input) {
        RecoverPassword recoverPassword = userService.getValidRecoverPasswordByHash(input.getHash());

        checkPassword(input.getPassword(), input.getPasswordRepeat());

        userService.resetPassword(recoverPassword, input.getPassword());
    }

    private void checkPassword(String password, String passwordRepeat) {
        if (!password.equals(passwordRepeat)) {
            throw new PasswordMismatchException();
        }
    }
}
