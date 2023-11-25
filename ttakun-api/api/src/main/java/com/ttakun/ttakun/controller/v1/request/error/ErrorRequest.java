package com.ttakun.ttakun.controller.v1.request.error;

import com.ttakun.ttakun.constants.ErrorConstants;
import com.ttakun.ttakun.useCase.error.saveError.SaveErrorInput;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.validation.constraints.NotNull;

@ApiModel(value = "ErrorRequest", description = "Error saving request wrapper")
public class ErrorRequest {
    @NotNull(message = ErrorConstants.REQUIRED)
    @ApiModelProperty(value = "error", required = true, dataType = "String", example = "Error occurred in APP.")
    private String error;

    public String getError() {
        return error;
    }

    public SaveErrorInput toSaveErrorInput(String user) {
        return new SaveErrorInput(error, user);
    }
}
