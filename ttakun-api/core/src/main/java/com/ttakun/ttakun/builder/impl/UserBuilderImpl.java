package com.ttakun.ttakun.builder.impl;

import com.ttakun.ttakun.builder.UserBuilder;
import com.ttakun.ttakun.dto.RecoverPasswordDTO;
import com.ttakun.ttakun.dto.UserDTO;
import com.ttakun.ttakun.entity.RecoverPassword;
import com.ttakun.ttakun.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

import com.ttakun.ttakun.util.CollectionUtil;

@Service
public class UserBuilderImpl implements UserBuilder {

    @Override
    public UserDTO convertToUserDTO(User user) {
        return new UserDTO(user);
    }

    @Override
    public List<UserDTO> convertToUserDTOs(List<User> users) {
        return CollectionUtil.convertToList(users, this::convertToUserDTO);
    }

    @Override
    public RecoverPasswordDTO convertToRecoverPasswordDTO(RecoverPassword recoverPassword) {
        UserDTO user = convertToUserDTO(recoverPassword.getUser());

        return new RecoverPasswordDTO(recoverPassword, user);
    }
}
