package com.ttakun.ttakun.dto;

import com.ttakun.ttakun.entity.RecoverPassword;

public class RecoverPasswordDTO {
    private String hash;
    private UserDTO user;
    private Boolean used;
    private Long expiringTime;

    public RecoverPasswordDTO(RecoverPassword recoverPassword, UserDTO user) {
        if (recoverPassword != null) {
            this.hash = recoverPassword.getHash();
            this.user = user;
            this.used = recoverPassword.getUsed();
            this.expiringTime = recoverPassword.getExpiringTime();
        }
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public Long getExpiringTime() {
        return expiringTime;
    }

    public void setExpiringTime(Long expiringTime) {
        this.expiringTime = expiringTime;
    }
}
