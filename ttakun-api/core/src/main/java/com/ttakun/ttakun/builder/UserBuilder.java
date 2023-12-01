package com.ttakun.ttakun.builder;

import com.ttakun.ttakun.dto.RecoverPasswordDTO;
import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.entity.User;

import java.util.List;

public interface UserBuilder {

    UserDTO convertToUserDTO(User user);

    List<UserDTO> convertToUserDTOs(List<User> users);

    RecoverPasswordDTO convertToRecoverPasswordDTO(RecoverPassword recoverPassword);
}
