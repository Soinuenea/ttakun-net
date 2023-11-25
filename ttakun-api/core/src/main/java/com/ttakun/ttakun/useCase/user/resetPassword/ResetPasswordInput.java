package com.ttakun.ttakun.useCase.user.resetPassword;

public class ResetPasswordInput {
    private String hash;
    private String password;
    private String passwordRepeat;

    public ResetPasswordInput(String hash, String password, String passwordRepeat) {
        this.hash = hash;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
    }

    public String getHash() {
        return hash;
    }

    public String getPassword() {
        return password;
    }

    public String getPasswordRepeat() {
        return passwordRepeat;
    }
}
