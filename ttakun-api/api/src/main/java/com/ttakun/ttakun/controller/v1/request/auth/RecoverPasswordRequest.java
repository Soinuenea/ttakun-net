package com.ttakun.ttakun.controller.v1.request.auth;

import com.ttakun.ttakun.constants.ErrorConstants;
import com.ttakun.ttakun.useCase.user.recoverPassword.RecoverPasswordInput;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@ApiModel(value = "RecoverPasswordRequest", description = "Password recovering request wrapper")
public class RecoverPasswordRequest {
    @Email(message = ErrorConstants.EMAIL_NOT_VALID)
    @NotBlank(message = ErrorConstants.REQUIRED)
    @ApiModelProperty(value = "email", required = true, dataType = "String", example = "admin@ttakun.com")
    private String email;

    public String getEmail() {
        return email;
    }

    public RecoverPasswordInput toRecoverPasswordInput() {
        return new RecoverPasswordInput(email);
    }
}
