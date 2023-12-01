package com.ttakun.ttakun.useCase.user.getRecoverPassword;

import com.ttakun.ttakun.builder.UserBuilder;
import com.ttakun.ttakun.dto.RecoverPasswordDTO;
import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GetRecoverPasswordUseCase {
    private UserService userService;
    private UserBuilder userBuilder;

    @Autowired
    public GetRecoverPasswordUseCase(UserService userService, UserBuilder userBuilder) {
        this.userService = userService;
        this.userBuilder = userBuilder;
    }

    public GetRecoverPasswordOutput execute(GetRecoverPasswordInput input) {
        RecoverPassword recoverPassword = userService.getRecoverPasswordOrException(input.getHash());
        RecoverPasswordDTO recoverPasswordDTO = userBuilder.convertToRecoverPasswordDTO(recoverPassword);

        return new GetRecoverPasswordOutput(recoverPasswordDTO);
    }
}
