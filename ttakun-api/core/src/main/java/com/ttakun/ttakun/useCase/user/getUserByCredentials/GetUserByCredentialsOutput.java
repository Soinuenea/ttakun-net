package com.ttakun.ttakun.useCase.user.getUserByCredentials;

import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.dto.UserPrivilegeDTO;

import java.util.List;

public class GetUserByCredentialsOutput {
    private UserDTO user;
    private List<UserPrivilegeDTO> userPrivileges;

    public GetUserByCredentialsOutput(UserDTO user, List<UserPrivilegeDTO> userPrivileges) {
        this.user = user;
        this.userPrivileges = userPrivileges;
    }

    public UserDTO getUser() {
        return user;
    }

    public List<UserPrivilegeDTO> getUserPrivileges() {
        return userPrivileges;
    }
}
