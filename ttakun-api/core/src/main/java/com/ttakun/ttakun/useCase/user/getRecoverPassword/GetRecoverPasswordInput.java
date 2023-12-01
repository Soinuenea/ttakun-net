package com.ttakun.ttakun.useCase.user.getRecoverPassword;

public class GetRecoverPasswordInput {
    private String hash;

    public GetRecoverPasswordInput(String hash) {
        this.hash = hash;
    }

    public String getHash() {
        return hash;
    }
}
