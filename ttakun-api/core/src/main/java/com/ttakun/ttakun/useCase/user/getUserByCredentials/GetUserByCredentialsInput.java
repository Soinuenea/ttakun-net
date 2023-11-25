package com.ttakun.ttakun.useCase.user.getUserByCredentials;

public class GetUserByCredentialsInput {
    private String email;
    private String password;

    public GetUserByCredentialsInput(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
