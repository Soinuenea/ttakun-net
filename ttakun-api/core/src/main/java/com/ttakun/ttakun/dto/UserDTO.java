package com.ttakun.ttakun.dto;

import com.ttakun.ttakun.entity.User;

import static java.util.Objects.nonNull;

public class UserDTO {
    private String hash;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean deleted;

    public UserDTO(User user) {
        if (nonNull(user)) {
            this.hash = user.getHash();
            this.firstName = user.getFirstName();
            this.lastName = user.getLastName();
            this.email = user.getEmail();
            this.deleted = user.getDeleted();
        }
    }

    public String getHash() {
        return hash;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getDeleted() {
        return deleted;
    }
}
