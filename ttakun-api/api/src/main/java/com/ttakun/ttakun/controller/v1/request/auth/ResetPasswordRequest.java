package com.ttakun.ttakun.controller.v1.request.auth;

import com.ttakun.ttakun.constants.ErrorConstants;
import com.ttakun.ttakun.useCase.user.resetPassword.ResetPasswordInput;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static com.ttakun.ttakun.constants.Constants.USER_PASSWORD_MAX_LENGTH;
import static com.ttakun.ttakun.constants.Constants.USER_PASSWORD_MIN_LENGTH;

@ApiModel(value = "ResetPasswordRequest", description = "Password resetting request wrapper")
public class ResetPasswordRequest {
    @NotNull(message = ErrorConstants.REQUIRED)
    private String hash;
    @NotNull(message = ErrorConstants.REQUIRED)
    @Size(min = USER_PASSWORD_MIN_LENGTH, max = USER_PASSWORD_MAX_LENGTH, message = ErrorConstants.LENGTH_NOT_VALID)
    @ApiModelProperty(value = "email", required = true, dataType = "String", example = "admin@ttakun.com")
    private String password;
    @NotNull(message = ErrorConstants.REQUIRED)
    @Size(min = USER_PASSWORD_MIN_LENGTH, max = USER_PASSWORD_MAX_LENGTH, message = ErrorConstants.LENGTH_NOT_VALID)
    @ApiModelProperty(value = "email", required = true, dataType = "String", example = "admin@ttakun.com")
    private String passwordRepeat;

    public ResetPasswordInput toResetPasswordInput() {
        return new ResetPasswordInput(hash, password, passwordRepeat);
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
