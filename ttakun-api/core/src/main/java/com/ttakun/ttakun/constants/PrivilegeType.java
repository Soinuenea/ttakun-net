package com.ttakun.ttakun.constants;

import java.util.Arrays;

import com.ttakun.ttakun.util.CollectionUtil;

public enum PrivilegeType {
    TYPE_ADMIN("ADMIN","privilege.type.admin"),
    TYPE_USER("USER", "privilege.type.user")
    ;

    private String code;
    private String display;

    PrivilegeType(String code, String display) {
        this.code = code;
        this.display = display;
    }

    public static PrivilegeType getByCode(String code) {
        return CollectionUtil.findOrNull(Arrays.asList(PrivilegeType.values()), value -> value.getCode().equals(code));
    }

    public String getCode() {
        return code;
    }

    public String getDisplay() {
        return display;
    }
}
