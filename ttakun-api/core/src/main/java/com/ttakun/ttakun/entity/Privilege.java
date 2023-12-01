package com.ttakun.ttakun.entity;

import com.ttakun.ttakun.entity.base.BaseEntity;

import javax.persistence.*;
import java.util.Set;

import static com.ttakun.ttakun.constants.PrivilegeType.TYPE_ADMIN;

@Entity
@Table(name = "privilege")
public class Privilege extends BaseEntity {
    @Column(name = "code", nullable = false)
    private String code;

    @OneToMany(mappedBy = "privilege", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<UserPrivilege> userPrivileges;

    public Privilege() { }

    public Privilege(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<UserPrivilege> getUserPrivileges() {
        return userPrivileges;
    }

    public boolean isAdmin() {
        return code.equals(TYPE_ADMIN.getCode());
    }

}
