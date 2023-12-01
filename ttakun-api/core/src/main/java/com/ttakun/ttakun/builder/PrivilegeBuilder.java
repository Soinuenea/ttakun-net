package com.ttakun.ttakun.builder;

import com.ttakun.ttakun.dto.PrivilegeDTO;
import com.ttakun.ttakun.entity.Privilege;

import java.util.List;

public interface PrivilegeBuilder {

    PrivilegeDTO convertToPrivilegeDTO(Privilege privilege);

    List<PrivilegeDTO> convertToPrivilegeDTOs(List<Privilege> privileges);
}
