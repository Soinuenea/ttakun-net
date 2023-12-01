package com.ttakun.ttakun.controller.v1.request.auth;

import com.ttakun.ttakun.constants.ErrorConstants;
import com.ttakun.ttakun.useCase.user.getUserByCredentials.GetUserByCredentialsInput;
import io.swagger.annotations.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel(value = "LoginRequest", description = "Login request wrapper")
public class LoginRequest {
    @Email(message = ErrorConstants.EMAIL_NOT_VALID)
    @NotBlank(message = ErrorConstants.REQUIRED)
    @ApiModelProperty(value = "email", required = true, dataType = "String", example = "admin@ttakun.com")
    private String email;
    @NotNull(message = ErrorConstants.REQUIRED)
    @ApiModelProperty(value = "password", required = true, dataType = "String", position = 1, example = "admin")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public GetUserByCredentialsInput toGetUserByCredentialsInput() {
        return new GetUserByCredentialsInput(email, password);
    }
}
