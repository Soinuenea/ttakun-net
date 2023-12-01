package com.ttakun.ttakun.useCase.error.saveError;

public class SaveErrorInput {
    private String error;
    private String user;

    public SaveErrorInput(String error, String user) {
        this.error = error;
        this.user = user;
    }

    public String getError() {
        return error;
    }

    public String getUser() {
        return user;
    }
}
