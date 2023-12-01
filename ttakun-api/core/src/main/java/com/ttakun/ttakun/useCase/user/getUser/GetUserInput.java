package com.ttakun.ttakun.useCase.user.getUser;

public class GetUserInput {
    private String hash;

    public GetUserInput(String hash) {
        this.hash = hash;
    }

    public String getHash() {
        return hash;
    }
}
