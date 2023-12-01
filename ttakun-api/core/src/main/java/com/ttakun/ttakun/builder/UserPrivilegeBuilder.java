package com.ttakun.ttakun.builder;

import com.ttakun.ttakun.dto.UserPrivilegeDTO;
import com.ttakun.ttakun.entity.UserPrivilege;

import java.util.Collection;
import java.util.List;

public interface UserPrivilegeBuilder {

    UserPrivilegeDTO convertToUserPrivilegeDTO(UserPrivilege userPrivilege);

    List<UserPrivilegeDTO> convertToUserPrivilegeDTOs(Collection<UserPrivilege> userPrivileges);
}
