package com.ttakun.ttakun.useCase.user.recoverPassword;

public class RecoverPasswordInput {
    private String email;

    public RecoverPasswordInput(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}
