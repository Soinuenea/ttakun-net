package com.ttakun.ttakun.builder.impl;

import com.ttakun.ttakun.builder.PrivilegeBuilder;
import com.ttakun.ttakun.builder.UserPrivilegeBuilder;
import com.ttakun.ttakun.dto.PrivilegeDTO;
import com.ttakun.ttakun.dto.UserPrivilegeDTO;
import com.ttakun.ttakun.entity.UserPrivilege;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

import com.ttakun.ttakun.util.CollectionUtil;


@Service
public class UserPrivilegeBuilderImpl implements UserPrivilegeBuilder {
    private PrivilegeBuilder privilegeBuilder;

    @Autowired
    public UserPrivilegeBuilderImpl(PrivilegeBuilder privilegeBuilder) {
        this.privilegeBuilder = privilegeBuilder;
    }

    @Override
    public UserPrivilegeDTO convertToUserPrivilegeDTO(UserPrivilege userPrivilege) {
        PrivilegeDTO privilege = privilegeBuilder.convertToPrivilegeDTO(userPrivilege.getPrivilege());

        return new UserPrivilegeDTO(userPrivilege.getHash(), privilege);
    }

    @Override
    public List<UserPrivilegeDTO> convertToUserPrivilegeDTOs(Collection<UserPrivilege> userPrivileges) {
        return CollectionUtil.convertToList(userPrivileges, this::convertToUserPrivilegeDTO);
    }
}
