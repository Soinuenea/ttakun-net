package com.ttakun.ttakun.controller.v1.response.auth.builder;

import com.ttakun.ttakun.controller.v1.response.auth.LoginResponse;

public class AuthResponseBuilder {

    public static LoginResponse getLoginResponse(String token, String refreshToken) {
        return new LoginResponse(token, refreshToken);
    }
}
