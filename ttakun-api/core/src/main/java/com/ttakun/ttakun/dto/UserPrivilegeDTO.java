package com.ttakun.ttakun.dto;

import static java.util.Objects.nonNull;

public class UserPrivilegeDTO {
    private String hash;
    private PrivilegeDTO privilege;

    public UserPrivilegeDTO(String hash, PrivilegeDTO privilege) {
        this.hash = hash;
        this.privilege = privilege;
    }

    public String getHash() {
        return hash;
    }

    public String getCode() {
        return nonNull(privilege) ? privilege.getCode() : "";
    }

    public String getPrivilegeHash() {
        return nonNull(privilege) ? privilege.getHash() : "";
    }

    public String getName() {
        return nonNull(privilege) ? privilege.getName() : "";
    }
}
