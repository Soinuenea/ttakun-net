package com.ttakun.ttakun.controller.v1.response.error;

import com.ttakun.ttakun.exception.BaseGlobalException;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Map;

public class ErrorResponse {
    private ErrorContainerResponse errors;

    public static ErrorResponse fromExceptionResult(BindingResult bindingResult) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromExceptionResult(bindingResult);

        return response;
    }

    public static ErrorResponse fromGlobalExceptionResult(String key) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromGlobalExceptionResult(key);

        return response;
    }

    public static ErrorResponse fromGlobalExceptionResultWithValues(String key, Map<String, ?> values) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromGlobalExceptionResultWithValues(key, values);

        return response;
    }

    public static ErrorResponse fromCustomFieldErrors(Map<String, String> errors) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromCustomFieldErrors(errors);

        return response;
    }

    public static ErrorResponse fromFieldAndError(String field, String error) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromFieldAndError(field, error);

        return response;
    }

    public static ErrorResponse fromGlobalExceptionSummary(String field, String error, List<BaseGlobalException> exceptions) {
        ErrorResponse response = new ErrorResponse();
        response.errors = ErrorContainerResponse.fromGlobalExceptionSummary(field, error, exceptions);

        return response;
    }

    public ErrorContainerResponse getErrors() {
        return errors;
    }
}
