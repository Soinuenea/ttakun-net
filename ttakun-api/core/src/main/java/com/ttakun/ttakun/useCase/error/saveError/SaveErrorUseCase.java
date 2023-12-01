package com.ttakun.ttakun.useCase.error.saveError;

import com.ttakun.ttakun.entity.Error;
import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.service.ErrorService;
import com.ttakun.ttakun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

import static java.util.Objects.nonNull;

@Component
public class SaveErrorUseCase {

    private ErrorService errorService;
    private UserService userService;

    @Autowired
    public SaveErrorUseCase(
        ErrorService errorService,
        UserService userService
    ) {
        this.errorService = errorService;
        this.userService = userService;
    }

    @Transactional
    public void execute(SaveErrorInput input) {
        User user = (nonNull(input.getUser())) ? userService.getUserOrException(input.getUser()) : null;
        Error error = new Error(input.getError(), user);

        errorService.save(error);
    }
}
