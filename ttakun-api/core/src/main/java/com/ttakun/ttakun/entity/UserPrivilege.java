package com.ttakun.ttakun.entity;

import com.ttakun.ttakun.entity.base.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "user_privilege")
public class UserPrivilege extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "privilege_id")
    private Privilege privilege;

    public UserPrivilege() { }

    public UserPrivilege(User user, Privilege privilege) {
        this.user = user;
        this.privilege = privilege;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Privilege getPrivilege() {
        return privilege;
    }

    public void setPrivilege(Privilege privilege) {
        this.privilege = privilege;
    }
}
