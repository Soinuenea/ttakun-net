package com.ttakun.ttakun.useCase.user.getUser;

import com.ttakun.ttakun.builder.UserBuilder;
import com.ttakun.ttakun.builder.UserPrivilegeBuilder;
import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.dto.UserPrivilegeDTO;
import com.ttakun.ttakun.entity.User;
import com.ttakun.ttakun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GetUserUseCase {
    private UserService userService;
    private UserBuilder userBuilder;
    private UserPrivilegeBuilder userPrivilegeBuilder;

    @Autowired
    public GetUserUseCase(UserService userService, UserBuilder userBuilder, UserPrivilegeBuilder userPrivilegeBuilder) {
        this.userService = userService;
        this.userBuilder = userBuilder;
        this.userPrivilegeBuilder = userPrivilegeBuilder;
    }

    public GetUserOutput execute(GetUserInput input) {
        User user = userService.getUserByHash(input.getHash());
        UserDTO userDTO = userBuilder.convertToUserDTO(user);
        List<UserPrivilegeDTO> userPrivilegeDTOs = userPrivilegeBuilder.convertToUserPrivilegeDTOs(user.getUserPrivileges());

        return new GetUserOutput(userDTO, userPrivilegeDTOs);
    }
}
