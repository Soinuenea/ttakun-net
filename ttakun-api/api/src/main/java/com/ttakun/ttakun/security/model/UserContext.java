package com.ttakun.ttakun.security.model;

import com.ttakun.ttakun.dto.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;

import java.util.List;

public class UserContext {
    private String hash;
    private String firstName;
    private String lastName;
    private List<GrantedAuthority> authorities;

    private UserContext(String hash, List<GrantedAuthority> authorities) {
        this.hash = hash;
        this.authorities = authorities;
    }

    private UserContext(UserDTO user, List<GrantedAuthority> authorities) {
        this.hash = user.getHash();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.authorities = authorities;
    }

    public static UserContext create(String hash, List<GrantedAuthority> authorities) {
        if (StringUtils.isEmpty(hash)) throw new IllegalArgumentException("Hash is blank: " + hash);
        return new UserContext(hash, authorities);
    }

    public static UserContext create(UserDTO user, List<GrantedAuthority> authorities) {
        if (user == null || StringUtils.isEmpty(user.getHash())) {
            throw new IllegalArgumentException("Hash is blank");
        }
        return new UserContext(user, authorities);
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

    public List<GrantedAuthority> getAuthorities() {
        return authorities;
    }
}
