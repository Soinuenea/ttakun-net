package com.ttakun.ttakun.dto;

import com.ttakun.ttakun.entity.Privilege;

import static java.util.Objects.nonNull;

public class PrivilegeDTO {
    private String hash;
    private String code;
    private String name;

    public PrivilegeDTO(Privilege privilege, String translatedName) {
        if (nonNull(privilege)) {
            this.hash = privilege.getHash();
            this.code = privilege.getCode();
            this.name = translatedName;
        }
    }

    public String getHash() {
        return hash;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }
}
