package com.ttakun.ttakun.entity;

import com.ttakun.ttakun.entity.base.BaseEntity;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Entity
@Table(name = "user")
public class User extends BaseEntity {
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "time_zone")
    private String timeZone;

    @Column(name = "deleted", columnDefinition = "BIT")
    private Boolean deleted;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<UserPrivilege> userPrivileges;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Error> errors;

    public User() { }

    public User(
        String firstName,
        String lastName,
        String email,
        String password,
        String timeZone
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.timeZone = timeZone;
    }

    public User(
        String firstName,
        String lastName,
        String email,
        String password,
        String timeZone,
        Boolean deleted
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.timeZone = timeZone;
        this.deleted = deleted;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(String timeZone) {
        this.timeZone = timeZone;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Set<UserPrivilege> getUserPrivileges() {
        return userPrivileges;
    }

    public void setUserPrivileges(Set<UserPrivilege> userPrivileges) {
        if (isNull(this.userPrivileges)) {
            initUserPrivileges();
        } else {
            this.userPrivileges.clear();
        }

        if (nonNull(userPrivileges)) {
            this.userPrivileges.addAll(userPrivileges);
        }
    }

    public Set<Error> getErrors() {
        return errors;
    }

    public void setErrors(Set<Error> errors) {
        this.errors = errors;
    }


    @Override
    @PrePersist
    protected void onCreate() {
        super.onCreate();
        if (isNull(this.deleted)) {
            this.deleted = false;
        }
    }

    private void initUserPrivileges() {
        userPrivileges = new LinkedHashSet<>();
    }
}
