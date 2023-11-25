package com.ttakun.ttakun.useCase.user.getUserByCredentials;

import com.ttakun.ttakun.builder.UserBuilder;
import com.ttakun.ttakun.builder.UserPrivilegeBuilder;
import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.dto.UserPrivilegeDTO;
import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.exception.UserNotFoundException;
import com.ttakun.ttakun.service.UserService;
import com.ttakun.ttakun.util.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetUserByCredentialsUseCase {
    private UserService userService;
    private UserBuilder userBuilder;
    private UserPrivilegeBuilder userPrivilegeBuilder;

    @Autowired
    public GetUserByCredentialsUseCase(UserService userService, UserBuilder userBuilder, UserPrivilegeBuilder userPrivilegeBuilder) {
        this.userService = userService;
        this.userBuilder = userBuilder;
        this.userPrivilegeBuilder = userPrivilegeBuilder;
    }

    public GetUserByCredentialsOutput execute(GetUserByCredentialsInput input) {
        User user = userService.getUserByEmailOrException(input.getEmail());
        checkIfPasswordIsCorrect(input.getPassword(), user);
        UserDTO userDTO = userBuilder.convertToUserDTO(user);
        List<UserPrivilegeDTO> userPrivilegeDTOs = userPrivilegeBuilder.convertToUserPrivilegeDTOs(user.getUserPrivileges());

        return new GetUserByCredentialsOutput(userDTO, userPrivilegeDTOs);
    }

    private static void checkIfPasswordIsCorrect(String password, User user) {
        if (!PasswordUtil.matches(password, user.getPassword())) {
            throw new UserNotFoundException();
        }
    }
}
